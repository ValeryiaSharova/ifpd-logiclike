import { ChildProcess, execSync, spawn } from 'child_process';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';

import { Platforms } from 'shared';

const platform = process.platform as Platforms;

export type TestServerOptions = {
  cwd: string;
  shell: string;
  builder: string;
};

const scripts: Record<Platforms, { init: string; bin: string }> = {
  win32: { init: 'pg:init:darwin', bin: 'postgres' },
  darwin: { init: 'pg:init:darwin', bin: 'postgres' },
  default: { init: 'pg:init', bin: 'postgres' },
};

const script = scripts[platform] ?? scripts.default;

const getPortAndDatabase = (connection: string) => {
  const match = connection.match(/:(\d+)\/([^?]+)/);

  return match
    ? { port: match[1], database: match[2] }
    : { port: '', database: '' };
};

export const dump = (url: string): string => {
  const { port, database } = getPortAndDatabase(url);

  const args =
    "--rows-per-insert=100 --no-owner --no-acl --disable-triggers --no-comments --no-publications --no-security-labels --no-subscriptions --no-tablespaces --exclude-table='pgmigration*'";

  return execSync(
    platform === 'win32'
      ? `pg_dump ${args} -d ${database} -p ${port} -F plain`
      : `pg_dump ${url} ${args} -F plain`
  )
    .toString()
    .replace(/(^--[^.].*)/gm, '');
};

export const testServer = async ({
  cwd,
  shell,
  builder,
}: TestServerOptions) => {
  process.env.CLUSTER = 'postgres_test';

  const DB_PORT = getPortAndDatabase(
    process.env.INTEGRATIONS_POSTGRES_TEST ?? ''
  ).port;
  const DB_PATH = join(cwd, 'data', process.env.CLUSTER);
  const DB_CONFIG = join(DB_PATH, 'postgresql.conf');

  const options = {
    env: { ...process.env, PORT: DB_PORT },
    shell,
    timeout: 40000,
    cwd,
  } as const;

  let server: ChildProcess | undefined = undefined;

  const dbCmd = (cmd: string) => {
    console.log(`> ${cmd}`);
    return execSync(cmd, { ...options, stdio: 'inherit' });
  };

  const clusterStart = async () =>
    new Promise((resolve, reject) => {
      console.log('> run DB cluster');
      const pg = spawn(script.bin, ['-D', DB_PATH, '-p', DB_PORT], {
        ...options,
        stdio: 'pipe',
      });

      pg.on('exit', (code, signal) => {
        console.log(`> DB exit with:`, { code, signal });
        reject({ code, signal });
      });

      pg.stderr.on('data', (data) => {
        const isReady = data
          .toString('utf8')
          .includes('database system is ready to accept connections');

        if (isReady) {
          console.log('> DB is ready');
          server = pg;
          resolve(undefined);
        }
      });
    });

  if (existsSync(DB_PATH)) {
    rmSync(DB_PATH, { recursive: true });
  }

  dbCmd(`${builder} run ${script.init}`);

  if (platform !== 'win32') {
    dbCmd(`echo "unix_socket_directories = '/tmp'" >> ${DB_CONFIG}`);
  }

  await clusterStart();

  return {
    destroy: () => {
      dbCmd(`pg_ctl stop -D ${DB_PATH}`);

      if (!server) {
        throw new Error('DB server not running');
      }

      server.kill();
      server = undefined;

      rmSync(DB_PATH, { recursive: true });
    },
  };
};

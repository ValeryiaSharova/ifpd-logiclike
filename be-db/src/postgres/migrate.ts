import 'src/plugins/env';

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';

import { importer } from '@dbml/core';

import { version } from 'package.json';

import { MODE, POSTGRES_URL } from 'src/constants/env';
import { BE_DB, PLATFORM, ROOT } from 'src/constants/process';
import { dump } from 'src/postgres/server';

console.info(`🚀 Start with version: ${version}`);

const cliArguments = process.argv.slice(2).join(' ');
const command = process.argv[2];

const pathToBin = join(ROOT, 'node_modules', '.bin', 'node-pg-migrate');
const pathToMigrations = join(BE_DB, 'migrations', 'postgres');
const pathToSchema = join(BE_DB, 'postgres.dbml');

execSync(
  `${pathToBin} ${cliArguments} -j=js --migrations-dir=${pathToMigrations}`,
  {
    cwd: ROOT,
    env: { ...process.env, DATABASE_URL: POSTGRES_URL },
    shell: PLATFORM.shell,
    stdio: 'inherit',
    timeout: 20000,
  }
);

if (MODE === 'development' && ['up', 'down'].includes(command)) {
  const sql = dump(POSTGRES_URL);
  const dbml = importer.import(sql, 'postgres');

  writeFileSync(pathToSchema, dbml);
}

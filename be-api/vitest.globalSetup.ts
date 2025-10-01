import 'src/plugins/env';

import { execSync } from 'child_process';

import { dump, testServer } from 'be-db/build/src/postgres/server';

// @ts-ignore
import { BE_DB, PLATFORM } from 'src/constants/process';

export default async () => {
  const server = await testServer({ cwd: BE_DB, ...PLATFORM });

  try {
    execSync(`${PLATFORM.builder} run pg:migrate up --no-verbose`, {
      cwd: BE_DB,
      env: process.env,
      shell: PLATFORM.shell,
      stdio: 'inherit',
      timeout: 40000,
    });

    process.env.TESTS_INITIAL_MIGRATION = dump(
      process.env.INTEGRATIONS_POSTGRES_TEST ?? ''
    );
  } finally {
    await server.destroy();
  }
};

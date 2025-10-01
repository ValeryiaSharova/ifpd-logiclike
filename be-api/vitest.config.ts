import { resolve } from 'path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      'src/integrations/postgres/connection': resolve(
        'src/integrations/postgres/__mocks__/connection.ts'
      ),
      src: resolve('src/'),
      shared: resolve('../shared/src/'),
    },
  },
  test: {
    globals: true,
    hookTimeout: 40000,
    globalSetup: [resolve('vitest.globalSetup.ts')],
    exclude: ['node_modules', 'dist'],
    pool: 'forks',
  },
});

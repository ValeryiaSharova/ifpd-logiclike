import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: false,
  entry: ['src/index.ts'],
  esbuildOptions(options) {
    options.external = [
      '@fastify/swagger',
      '@fastify/swagger-ui',
      'fastify-extract-definitions',
    ];
  },
  esbuildPlugins: [],
  format: 'cjs',
  minify: true,
  noExternal: process.argv[4] === 'development' ? undefined : [/(.*)/],
  sourcemap: true,
  splitting: false,
  treeshake: true,
});

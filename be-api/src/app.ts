import ajvKeywords from 'ajv-keywords';
import Fastify, { LogLevel } from 'fastify';

import { BODY_LIMIT } from 'src/constants/settings';
import { plugins } from 'src/plugins';
import { routes } from 'src/routes';
import { schemas } from 'src/schemas';

export const app = (options: { logger: { level?: LogLevel } | boolean }) => {
  const fastify = Fastify({
    ...options,
    bodyLimit: BODY_LIMIT,
    trustProxy: true,
    ajv: {
      customOptions: { coerceTypes: 'array' },
      plugins: [ajvKeywords],
    },
  });

  void plugins(fastify);
  void schemas(fastify);
  void routes(fastify);

  return fastify;
};

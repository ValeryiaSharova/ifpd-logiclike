import 'src/plugins/env';

import { version } from 'package.json';

import { app } from 'src/app';
import { LOG_LEVEL, MODE, SERVICES } from 'src/constants/env';
import {
  isPostgresConnected,
  postgres,
} from 'src/integrations/postgres/connection';
import { disconnect } from 'src/plugins/session';

const fastify = app({
  logger: { level: LOG_LEVEL },
});

fastify.addHook('onError', (request, reply, error, done) => {
  if (error.statusCode !== 400) {
    console.error(error, request);
  }

  done();
});

fastify.addHook('onClose', async () => {
  await postgres.end();
  await disconnect();
});

fastify.listen(
  { host: '0.0.0.0', port: SERVICES.api.port },
  async (error, address) => {
    if (error) {
      fastify.log.error(error);
      process.exit(1);
    }

    if (MODE === 'development') {
      fastify.swagger();
    }

    console.info(`🚀 Server ${version} ready at: ${address}`);

    const isPGConnected = await isPostgresConnected();

    console.info(
      isPGConnected
        ? '🔥 PostgreSQL is connected'
        : '💩 PostgreSQL is not connected'
    );
  }
);

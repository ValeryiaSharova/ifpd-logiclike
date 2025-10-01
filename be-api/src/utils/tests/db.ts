import supertest from 'supertest';

import { app } from 'src/app';
import { backup, postgres } from 'src/integrations/postgres/connection';
import { disconnect } from 'src/plugins/session';

const fastify = app({ logger: false });

export const runServer = async () => {
  await fastify.ready();
};

export const stopDB = async () => {
  await postgres.end();
  await disconnect();
};

export const stopServer = async () => {
  await stopDB();
  await fastify.close();
};

export const restoreDB = async () => {
  backup.restore();
};

export const server = supertest(fastify.server);

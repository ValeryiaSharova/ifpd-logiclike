import { Signer } from '@fastify/cookie';
import { FastifySessionOptions } from '@fastify/session';

import { SERVICES, SESSION_SECRET } from 'src/constants/env';
import { PostgreSQLStore } from 'src/integrations/postgres/PostgreSQLStore';

const expiresInMs = 1000 * 60 * 60 * 24 * 30; // 30 days;

const store = new PostgreSQLStore();

export const cookieSigner = new Signer(SESSION_SECRET, 'sha256');

export const disconnect = async () => await store.close();

export const sessionConfig: FastifySessionOptions = {
  cookie: {
    secure: SERVICES.api.host !== 'localhost',
    httpOnly: true,
    maxAge: expiresInMs,
    sameSite: 'strict',
  },
  saveUninitialized: false,
  secret: cookieSigner,
};

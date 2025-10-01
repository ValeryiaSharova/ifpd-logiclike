/* eslint-disable @typescript-eslint/no-var-requires */
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import passport from '@fastify/passport';
import rateLimit from '@fastify/rate-limit';
import session from '@fastify/session';
import { FastifyInstance } from 'fastify';

import { MODE } from 'src/constants/env';
import { corsConfig } from 'src/plugins/cors';
import { helmetConfig } from 'src/plugins/helmet';
import { rateLimitConfig } from 'src/plugins/rateLimit';
import { sessionConfig } from 'src/plugins/session';

export const plugins = (fastify: FastifyInstance) => {
  if (MODE === 'development') {
    const swagger = require('@fastify/swagger');
    const swaggerUI = require('@fastify/swagger-ui');
    const extractor = require('fastify-extract-definitions');

    const { extractorConfig } = require('src/plugins/extractor');
    const { swaggerConfig, swaggerUIConfig } = require('src/plugins/swagger');

    void fastify.register(extractor, extractorConfig);
    void fastify.register(swagger, swaggerConfig);
    void fastify.register(swaggerUI, swaggerUIConfig);
  }

  void fastify.register(rateLimit, rateLimitConfig);
  void fastify.register(helmet, helmetConfig);
  void fastify.register(cors, corsConfig);

  void fastify.register(cookie);
  void fastify.register(session, sessionConfig);

  void fastify.register(passport.initialize());
  void fastify.register(passport.secureSession());
};

import { FastifyCorsOptions } from '@fastify/cors';

import { INFRASTRUCTURE, makeOrigin } from 'shared';

export const corsConfig: FastifyCorsOptions = {
  credentials: true,
  optionsSuccessStatus: 200,
  origin: Object.values(INFRASTRUCTURE).map(({ web }) => makeOrigin(web)),
};

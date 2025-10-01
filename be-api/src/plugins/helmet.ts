import { FastifyHelmetOptions } from '@fastify/helmet';

import { MODE } from 'src/constants/env';

export const helmetConfig: FastifyHelmetOptions = {
  frameguard: { action: 'deny' },
  crossOriginResourcePolicy:
    MODE === 'development' ? { policy: 'cross-origin' } : undefined,
};

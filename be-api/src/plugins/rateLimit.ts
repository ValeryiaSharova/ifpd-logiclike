import { RateLimitOptions } from '@fastify/rate-limit';

import { ERRORS } from 'shared';

export const rateLimitConfig: RateLimitOptions = {
  max: 50,
  timeWindow: '1 minute',
  errorResponseBuilder: () => ({ error: ERRORS.TOO_MANY_REQUESTS }),
};

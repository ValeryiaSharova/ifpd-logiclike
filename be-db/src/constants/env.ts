import { Mode } from 'shared';

export const MODE = (process.env.NODE_ENV || 'development') as Mode;

export const POSTGRES_URL =
  process.env[
    MODE === 'test'
      ? 'INTEGRATIONS_POSTGRES_TEST'
      : 'INTEGRATIONS_POSTGRES_WORK'
  ] || '';

import { LogLevel } from 'fastify';

import { Environment, INFRASTRUCTURE, Mode } from 'shared';

export const MODE = (process.env.NODE_ENV || 'development') as Mode;
export const PUBLIC_ENV = (process.env.PUBLIC_ENV || 'local') as Environment;

export const LOG_LEVEL = (process.env.LOG_LEVEL || 'info') as LogLevel;

export const INTEGRATIONS = {
  postgres: {
    url: process.env.INTEGRATIONS_POSTGRES_WORK || '',
  },
} as const;

export const SERVICES = INFRASTRUCTURE[PUBLIC_ENV];

export const SESSION_SECRET = process.env.BACKEND_SESSION_SECRET || '';
export const PASSWORD_SALT = process.env.BACKEND_PASSWORD_SALT || '';

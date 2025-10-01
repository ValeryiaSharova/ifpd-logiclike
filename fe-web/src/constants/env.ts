import { Environment, INFRASTRUCTURE, Mode } from 'shared';

import { Version } from 'src/_generated';

export const MODE = (process.env.NODE_ENV || 'development') as Mode;
export const PUBLIC_ENV = (import.meta.env.VITE_PUBLIC_ENV ||
  'local') as Environment;

export const SERVICES = INFRASTRUCTURE[PUBLIC_ENV];

export const VERSION: Version = {
  client: 'web',
  environment: PUBLIC_ENV,
  mode: MODE,
  version: import.meta.env.VITE_VERSION || '',
};

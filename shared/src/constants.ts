export const ENVIRONMENTS = ['local', 'staging', 'production'] as const;
export type Environment = (typeof ENVIRONMENTS)[number];

export const MODES = ['production', 'development', 'test'] as const;
export type Mode = (typeof MODES)[number];

export type Platforms = 'win32' | 'darwin' | 'default';
export const PLATFORMS: Record<
  Platforms,
  { builder: string; shell: string | undefined }
> = {
  win32: { builder: 'yarn.cmd', shell: 'cmd.exe' },
  darwin: { builder: 'yarn', shell: undefined },
  default: { builder: 'yarn', shell: undefined },
};

export type Origin = {
  protocol: 'http' | 'https';
  host: string;
  port: number;
};

type Services = {
  api: Origin;
  web: Origin;
};

export const INFRASTRUCTURE: Record<Environment, Services> = {
  local: {
    api: {
      protocol: 'http',
      host: 'localhost',
      port: 8000,
    },
    web: {
      protocol: 'http',
      host: 'localhost',
      port: 3000,
    },
  },
  staging: {
    api: {
      protocol: 'https',
      host: '',
      port: 10000,
    },
    web: {
      protocol: 'http',
      host: '',
      port: 3000,
    },
  },
  production: {
    api: {
      protocol: 'https',
      host: '',
      port: 8000,
    },
    web: {
      protocol: 'https',
      host: '',
      port: 3000,
    },
  },
};

export const REQUIRED_MIN_LENGTH = 1;
export const PASSWORD_MIN_LENGTH = 8;
export const PG_MAX_SAFE_INTEGER = 2147483647;

export const PAGINATION_LIMIT = 50;
export const END_OF_LIST = 0;

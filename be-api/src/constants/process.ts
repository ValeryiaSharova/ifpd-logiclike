import { join, resolve } from 'path';

import { PLATFORMS, Platforms } from 'shared';

const cwd = process.cwd();

export const PLATFORM =
  PLATFORMS[process.platform as Platforms] ?? PLATFORMS.default;

export const ROOT = resolve(cwd, '..');
export const BE_API = cwd;
export const BE_DB = join(ROOT, 'be-db');

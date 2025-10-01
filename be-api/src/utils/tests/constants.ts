import { version } from 'package.json';

import { Version } from 'src/_generated';

export const VERSION: Version = {
  client: 'web',
  environment: 'local',
  mode: 'test',
  version,
};

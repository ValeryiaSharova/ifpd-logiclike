import { AppIpVoices } from 'src/integrations/postgres/storage/app/types';

export const mock = (options: Partial<AppIpVoices>): AppIpVoices => ({
  ip: '127.0.0.1',
  ideas_ids: [1],
  ...options,
});

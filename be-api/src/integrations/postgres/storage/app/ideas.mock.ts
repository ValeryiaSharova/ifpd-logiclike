import { AppIdeas } from 'src/integrations/postgres/storage/app/types';

export const mock = (options: Partial<AppIdeas>): AppIdeas => ({
  id: 1,
  name: 'Idea',
  count: 1,
  ...options,
});

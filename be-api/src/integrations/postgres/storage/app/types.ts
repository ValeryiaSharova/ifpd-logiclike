import { ID } from 'src/types';

export type AppIdeas = {
  id: ID;
  name: string;
  count: number;
};

export type AppIpVoices = {
  ip: string;
  ideas_ids: AppIdeas['id'][];
};

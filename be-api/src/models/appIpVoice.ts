import { JSONSchema4 } from 'json-schema';

import { Models } from 'src/_generated';
import { AppIpVoices } from 'src/integrations/postgres/storage/app/types';

type Model = Models['appIpVoice'];

export const model: JSONSchema4 = {
  type: 'object',
  title: 'AppIpVoice',
  description: 'AppIpVoice model',
  required: ['ip', 'ideas_ids'],
  properties: {
    ip: { type: 'string' },
    ideas_ids: { type: 'array', items: { type: 'number' } },
  },
  additionalProperties: false,
};

export const mock = (options: Partial<Model>): Model => ({
  ip: '127.0.0.1',
  ideas_ids: [1],
  ...options,
});

export const driver = (data: AppIpVoices): Model => ({
  ip: data.ip,
  ideas_ids: data.ideas_ids,
});

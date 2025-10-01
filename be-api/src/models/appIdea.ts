import { JSONSchema4 } from 'json-schema';

import { Models } from 'src/_generated';
import { AppIdeas } from 'src/integrations/postgres/storage/app/types';

type Model = Models['appIdea'];

export const model: JSONSchema4 = {
  type: 'object',
  title: 'AppIdea',
  description: 'AppIdea model',
  required: ['id', 'name', 'count'],
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    count: { type: 'integer' },
  },
  additionalProperties: false,
};

export const mock = (options: Partial<Model>): Model => ({
  id: 1,
  name: 'Idea',
  count: 1,
  ...options,
});

export const driver = (data: AppIdeas): Model => ({
  name: data.name,
  count: data.count,
  id: data.id,
});

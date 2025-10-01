import { JSONSchema4 } from 'json-schema';

import { models as rawModels } from 'src/models';

export const models: JSONSchema4 = {
  $id: 'models',
  type: 'object',
  title: 'models',
  required: Object.keys(rawModels),
  properties: Object.entries(rawModels).reduce<
    NonNullable<JSONSchema4['properties']>
  >((acc, [name, { model }]) => {
    acc[name] = model;
    return acc;
  }, {}),
  additionalProperties: false,
};

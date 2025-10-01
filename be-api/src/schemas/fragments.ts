import { JSONSchema4 } from 'json-schema';

export const fragments: JSONSchema4 = {
  $id: 'fragments',
  type: 'object',
  title: 'fragments',
  required: ['version'],
  properties: {
    version: {
      type: 'object',
      title: 'Version',
      description: 'Version fragment',
      required: ['client', 'environment', 'mode', 'version'],
      properties: {
        client: { $ref: 'enums#/properties/client' },
        environment: { $ref: 'enums#/properties/environment' },
        mode: { $ref: 'enums#/properties/mode' },
        version: { type: 'string' },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

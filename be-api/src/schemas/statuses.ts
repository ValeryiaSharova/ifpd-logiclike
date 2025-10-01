import { JSONSchema4 } from 'json-schema';

export const statuses: JSONSchema4 = {
  $id: 'statuses',
  type: 'object',
  title: 'statuses',
  required: ['error', 'status'],
  properties: {
    error: {
      type: 'object',
      title: 'Error',
      description: 'Error response',
      required: ['error'],
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
      },
      additionalProperties: false,
    },
    status: {
      type: 'object',
      title: 'Status',
      description: 'Status response',
      required: ['status'],
      properties: {
        status: { type: 'boolean' },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

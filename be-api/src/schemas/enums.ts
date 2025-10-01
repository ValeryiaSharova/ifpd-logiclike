import { JSONSchema4 } from 'json-schema';

import { ENVIRONMENTS, LOCALES, MODES } from 'shared';

export const enums: JSONSchema4 = {
  $id: 'enums',
  type: 'object',
  title: 'enums',
  required: ['client', 'environment', 'locale', 'mode', 'orderDirection'],
  properties: {
    client: {
      title: 'EnumsClient',
      type: 'string',
      enum: ['web'],
    },
    environment: {
      title: 'EnumsEnvironment',
      type: 'string',
      enum: ENVIRONMENTS as never,
    },
    locale: {
      title: 'EnumsLocale',
      type: 'string',
      enum: LOCALES as never,
    },
    mode: {
      title: 'EnumsMode',
      type: 'string',
      enum: MODES as never,
    },
    orderDirection: {
      title: 'EnumsOrderDirection',
      type: 'string',
      enum: ['asc', 'desc'],
    },
  },
  additionalProperties: false,
};

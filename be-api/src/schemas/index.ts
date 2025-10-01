import { FastifyInstance } from 'fastify';
import { JSONSchema4 } from 'json-schema';

import { enums } from 'src/schemas/enums';
import { fragments } from 'src/schemas/fragments';
import { models } from 'src/schemas/models';
import { statuses } from 'src/schemas/statuses';

export const pureSchemas: JSONSchema4[] = [enums, fragments, statuses, models];

export const schemas = (fastify: FastifyInstance) =>
  pureSchemas.forEach((schema) => fastify.addSchema(schema));

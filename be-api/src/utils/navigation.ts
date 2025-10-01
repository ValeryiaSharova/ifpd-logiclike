import { FastifyInstance, HTTPMethods, RouteShorthandOptions } from 'fastify';
import { JSONSchema4 } from 'json-schema';

import {
  Endpoints,
  EndpointsToMethod,
  FeScheme,
  HTTP_STATUS,
  makeHierarchicalPath,
  makeOrigin,
  makeSimplePath,
} from 'shared';

import { Handler, Models } from 'src/_generated';
import { SERVICES } from 'src/constants/env';
import { EndpointTag } from 'src/plugins/swagger';
import { ID, Roles } from 'src/types';

type ModeToHandler<Model, Item> = {
  getList: (list: Item[]) => { list: Item[]; model: Model };
  getItem: (item: Item) => { item: Item; model: Model };
  putItem: (item: Item) => { item: Item; model: Model };
  postItem: (item: Item) => { item: Item; model: Model };
  deleteItem: (item: ID) => { item: ID; model: Model };
  status: (status: boolean) => { status: boolean };
};

type Mode = keyof ModeToHandler<never, never>;
type Model = keyof Models;
type Response = Partial<Record<HTTP_STATUS, JSONSchema4>>;
type Properties = NonNullable<JSONSchema4['properties']>;

type EndpointConfig = {
  options: RouteShorthandOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: Handler<any>;
};

type ConfigOptions<M1 extends Mode, M2 extends Model> = {
  tag: EndpointTag;
  mode: M1;
  roles: Roles[];
  preValidation?: ROptions['preValidation'];
  preHandler?: ROptions['preHandler'];
  schema: Omit<ROptions['schema'], 'description' | 'tags' | 'response'> & {
    response: {
      model: M1 extends 'status' ? 'status' : M2;
      errors: HTTP_STATUS[];
    };
  };
};

type Routes = {
  [Endpoint in Endpoints]: Record<
    EndpointsToMethod[Endpoint][number],
    EndpointConfig
  >;
};
type ROptions = Required<RouteShorthandOptions>;

export const router = (routes: Routes) => (fastify: FastifyInstance) =>
  fastify.register(async (fastify) => {
    Object.entries(routes).forEach(([url, config]) => {
      Object.entries(config).forEach(([_method, { options, handler }]) => {
        const method = _method as HTTPMethods;

        fastify.route({ ...options, method, url, handler });
      });
    });
  });

const makeResponseSchema = (
  model: Model | 'status',
  errors: HTTP_STATUS[],
  mode: Mode,
  isAuthOnly: boolean
): Response => {
  const base: Properties = { model: { type: 'string', enum: [model] } };
  const item: JSONSchema4 =
    mode === 'deleteItem'
      ? { type: 'integer' }
      : { $ref: `models#/properties/${model}` };

  const properties: Properties =
    mode === 'getList'
      ? {
          ...base,
          list: { type: 'array', items: item },
        }
      : { ...base, item };

  const schema: JSONSchema4 =
    model === 'status'
      ? { $ref: 'statuses#/properties/status' }
      : {
          type: 'object',
          required: Object.keys(properties),
          properties,
          additionalProperties: false,
        };

  return errors.reduce<Response>(
    (acc, error) => {
      acc[error] = { $ref: 'statuses#/properties/error' };
      return acc;
    },
    {
      [HTTP_STATUS.OK]: schema,
      ...(isAuthOnly
        ? { [HTTP_STATUS.UNAUTHORIZED]: { $ref: 'statuses#/properties/error' } }
        : {}),
    }
  );
};

export const config = <M1 extends Mode, M2 extends Model>(
  description: string,
  {
    tag,
    roles,
    preHandler = [],
    preValidation = [],
    schema,
    mode,
  }: ConfigOptions<M1, M2>
): {
  options: RouteShorthandOptions;
  onSuccess: ModeToHandler<M2, Models[M2]>[M1];
} => ({
  onSuccess: ((...args: unknown[]) => {
    const { model } = schema.response;

    if (mode === 'status') {
      return { status: args[0] };
    }

    return mode === 'getList'
      ? { model, list: args[0] }
      : { model, item: args[0] };
  }) as never,
  options: {
    schema: {
      ...schema,
      description,
      tags: [tag, ...roles.map((role) => `role:${role}`)],
      response: makeResponseSchema(
        schema.response.model,
        schema.response.errors,
        mode,
        !roles.includes('guest')
      ),
    },
    preValidation: Array.isArray(preValidation)
      ? preValidation
      : [preValidation],
    preHandler: [...(Array.isArray(preHandler) ? preHandler : [preHandler])],
  },
});

export const makeApiUrl = makeSimplePath<Endpoints>;

export const makeWebUrl = (scheme: FeScheme) => {
  const result = makeHierarchicalPath(
    undefined,
    Array.isArray(scheme) ? scheme : [scheme],
    'replace'
  );

  if (!result) {
    throw new Error(`Invalid url scheme: ${JSON.stringify(scheme)}`);
  }

  return makeOrigin(SERVICES.web) + result.pathname + (result.search ?? '');
};

import { Effect, createEffect } from 'effector';
import { stringify } from 'qs';
import {
  AxiosOptions,
  Payload,
  Effect as WrapperEffect,
  makeApi,
} from 'types-to-fetchers';

import { ENDPOINTS, makeOrigin } from 'shared';

import { API, Error } from 'src/_generated';
import { toasts } from 'src/actions/ui';
import { SERVICES } from 'src/constants/env';

type Api = Omit<
  API,
  | '*'
  | '/swagger'
  | '/swagger/'
  | '/swagger/*'
  | '/swagger/initOAuth'
  | '/swagger/json'
  | '/swagger/static/*'
  | '/swagger/static/index.html'
  | '/swagger/static/swagger-initializer.js'
  | '/swagger/uiConfig'
  | '/swagger/yaml'
>;

export type MakeEffect<PayloadRecord extends Payload> = Effect<
  Omit<PayloadRecord, 'Reply'> & AxiosOptions,
  Reply<PayloadRecord>
>;

type Reply<PayloadRecord extends Payload> = Exclude<
  PayloadRecord['Reply'],
  Error
>;

type Methods<MethodsRecord extends Record<string, Payload>> = {
  [Method in keyof MethodsRecord]: MakeEffect<MethodsRecord[Method]>;
};

type Endpoints<EndpointsRecord extends object> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  [Endpoint in keyof EndpointsRecord]: Methods<EndpointsRecord[Endpoint]>;
};

const makeEffect: WrapperEffect<Payload, Error> = (action) => {
  const event = createEffect(action);

  event.fail.watch(async ({ error }) => {
    if (error.toString() !== 'canceled') {
      const errorStr = error?.message || String(error);

      toasts.add({ message: errorStr, type: 'error' });
    }
  });

  return event;
};

export const api = makeApi<Api, Error, Endpoints<Api>>(ENDPOINTS, {
  baseURL: makeOrigin(SERVICES.api),
  effect: makeEffect,
  paramsSerializer: (params) => stringify(params, { arrayFormat: 'repeat' }),
});

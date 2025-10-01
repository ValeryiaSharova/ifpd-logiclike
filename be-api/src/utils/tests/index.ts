import { HTTPMethods } from 'fastify';

import { Endpoints, HTTP_STATUS } from 'shared';

import { API } from 'src/_generated';
import { makeApiUrl } from 'src/utils/navigation';
import { server } from 'src/utils/tests/db';

type GetRequestBody<R> = 'Body' extends keyof R
  ? { requestBody: R['Body'] }
  : {};
type GetReply<R> = 'Reply' extends keyof R ? { body: R['Reply'] } : {};
type GetParams<R> = 'Params' extends keyof R ? { params: R['Params'] } : {};
type GetQuerystring<R> = 'Querystring' extends keyof R
  ? { querystring: R['Querystring'] }
  : {};

const methodsWithBody = ['POST', 'PUT', 'PATCH'];

export const makeRequest = async <E extends keyof API, M extends keyof API[E]>(
  params: {
    endpoint: E;
    method: M;
    contentType?: string;
    cookie?: string | boolean;
  } & GetRequestBody<API[E][M]> &
    GetParams<API[E][M]> &
    GetQuerystring<API[E][M]>
): Promise<
  GetReply<API[E][M]> & {
    headers: Record<string, string>;
    statusCode: HTTP_STATUS;
  }
> => {
  const { endpoint, method, contentType } = params;

  const url =
    'params' in params
      ? makeApiUrl({
          scheme: endpoint as Endpoints,
          params: params.params as never,
        })
      : endpoint;

  const handlerWithMethod =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    server[(method as any).toLowerCase() as HTTPMethods](url);

  if (contentType) {
    void handlerWithMethod.set('Content-Type', contentType);
  }

  const handlerAfterQuerystring =
    'querystring' in params
      ? handlerWithMethod.query(params.querystring as never)
      : handlerWithMethod;

  void handlerAfterQuerystring.send(
    'requestBody' in params ? (params.requestBody as never) : {}
  );

  const response = await (methodsWithBody.includes(method as string)
    ? handlerAfterQuerystring
    : handlerAfterQuerystring);

  return response as never;
};

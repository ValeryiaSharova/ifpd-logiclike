import { compile } from 'path-to-regexp';

type Reverse<T extends Record<PropertyKey, PropertyKey>> = {
  [P in keyof T as T[P]]: P;
};

export const pagesToGroups = {
  '/': 'App',
} as const;

type PagesToGroups = typeof pagesToGroups;
export type Pages = keyof PagesToGroups;
export type EndpointsToMethod = typeof ENDPOINTS;
export type Endpoints = keyof EndpointsToMethod;
export type Groups = PagesToGroups[Pages];
export type GroupsToPages = Reverse<PagesToGroups>;

export const ENDPOINTS = {
  '/app/ideas': ['GET'],
  '/app/ideas/:id': ['PUT'],

  '/app/ip-voices': ['GET'],
} as const;

export type Path = {
  pathname: string;
  search?: string;
};

type ParsedPathname = string[];
type ParsedSearchParams = Record<string, string>;

export type Scheme<Schemes extends Pages | Endpoints = Pages | Endpoints> = {
  scheme: Schemes;
  params?: Record<string, string>;
  getParams?: ParsedSearchParams;
};

export type FeScheme = Scheme<Pages> | [Scheme<Pages>];

const DELIMITER = '/~';

export const allPages = Object.keys(pagesToGroups) as Pages[];

export const isPage = (path: string) => allPages.includes(path as never);

const parsePathname = (path = ''): ParsedPathname => {
  const parts = path.split(DELIMITER).filter((item) => !!item);
  return path.startsWith(DELIMITER) ? ['/', ...parts] : parts;
};

const compilePathname = (
  prev: ParsedPathname,
  scheme: Scheme<Pages>['scheme'],
  params: Scheme<Pages>['params']
): ParsedPathname => {
  const isCompilable = scheme.includes(':') || params;
  const compiled = isCompilable
    ? compile(scheme, { encode: encodeURIComponent })(params)
    : scheme;
  const filtered = prev.filter((item) => item !== compiled);

  if (isPage(scheme) && filtered.length) {
    throw new Error('Use option `mode=replace`');
  }

  return [...filtered, compiled];
};

const parseQueryString = (path = ''): ParsedSearchParams =>
  path
    .slice(1)
    .split('&')
    .reduce((acc, item) => {
      const [key, value] = item.split('=');
      return key ? { ...acc, [key]: value } : acc;
    }, {});

const serializeQueryString = (
  params: ParsedSearchParams
): string | undefined =>
  Object.keys(params).length
    ? `?${Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
    : undefined;

export const makeSimplePath = <T extends Pages | Endpoints>({
  scheme,
  params,
  getParams,
}: Scheme<T>) => {
  const isCompilable = scheme.includes(':') || params;
  const compiled = isCompilable
    ? compile(scheme, { encode: encodeURIComponent })(params)
    : scheme;

  return compiled + (serializeQueryString(getParams ?? {}) ?? '');
};

export const makeHierarchicalPath = (
  from: Path | undefined,
  to: Scheme<Pages>[],
  mode: 'replace' | 'detect'
): Path | null => {
  if (!to || !to.length) {
    return null;
  }

  try {
    const precompiled = to.reduce<{
      pathname: ParsedPathname;
      search: ParsedSearchParams;
    }>(
      (acc, { scheme, params, getParams }) => {
        acc.pathname = compilePathname(acc.pathname, scheme, params);

        if (getParams) {
          acc.search = { ...acc.search, ...getParams };
        }

        return acc;
      },
      mode === 'replace' || (mode === 'detect' && isPage(to[0].scheme))
        ? { pathname: [], search: {} }
        : {
            pathname: parsePathname(from?.pathname),
            search: parseQueryString(from?.search),
          }
    );

    return {
      pathname: precompiled.pathname.join(DELIMITER).replaceAll('//', '/'),
      search: serializeQueryString(precompiled.search),
    };
  } catch (error) {
    console.error('makeURL', error);
    return null;
  }
};

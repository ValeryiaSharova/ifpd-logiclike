import { matchRoutes, useLocation } from 'react-router';

import { Groups, Pages, allPages, pagesToGroups } from 'shared';

export type DefaultParams = Record<string, string>;

export type ParsedPageScheme<
  Params = DefaultParams,
  Scheme extends Pages = Pages,
> = {
  group: Groups;
  scheme: Scheme;
  params: Params;
};

export const useRouteMatch = <
  Params = DefaultParams,
  Scheme extends Pages = Pages,
>(): ParsedPageScheme<Params, Scheme> | undefined => {
  const { pathname } = useLocation();

  const section = pathname.split('/~')[0];

  let scheme = section as Scheme;

  if (allPages.includes(scheme)) {
    return {
      group: pagesToGroups[scheme],
      scheme,
      params: {} as Params,
    };
  }

  const match = matchRoutes(
    allPages.map((item) => ({ path: item })),
    section
  );

  if (!match) {
    return undefined;
  }

  const { params, route } = match[0];
  scheme = route.path as Scheme;

  return {
    group: pagesToGroups[scheme],
    scheme,
    params: params as Params,
  };
};

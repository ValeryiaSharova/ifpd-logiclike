import { Pages } from 'shared';

import {
  GroupsRoute,
  PageRoute,
  Roles,
  groups as groupsConfig,
  pages as pagesConfig,
} from 'src/components/routes';

type Route = GroupsRoute;

type RouteWithScheme = Route & { scheme: Pages };
type Routes = Record<Roles, string[]>;

export type SwitchMode = {
  mode: Roles;
};

const allRoutes = (config: Record<string, Route>): RouteWithScheme[] =>
  Object.keys(config).map(
    (scheme: string) => ({ scheme, ...config[scheme] }) as never
  );

const filterConfig = (list: RouteWithScheme[], access: Roles): string[] =>
  list
    .filter((item) => item.access === 'all' || item.access.includes(access))
    .map((item) => item.scheme);

const createRoutes = (): Routes => {
  const list = allRoutes(groupsConfig);

  return {
    guest: filterConfig(list, 'guest'),
  };
};

export const allowedGroups: Routes = createRoutes();

export const getRouteConfigByPath = (path?: string): Partial<PageRoute> =>
  pagesConfig[path as Pages] || {};

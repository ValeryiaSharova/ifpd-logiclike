import React, { lazy } from 'react';

import { FeScheme, Groups, Pages } from 'shared';

import { Template } from 'src/components/templates/types';
import { DictionaryKey } from 'src/i18n';

export type Roles = 'guest';

export const pagesRedirect: Record<Roles, FeScheme> = {
  guest: { scheme: '/' },
};

type Route = {
  access: 'all' | Roles[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.FC<any>;
};

export type PageRoute = {
  title: DictionaryKey;
  titleCustom?: 'username';
};
export type GroupsRoute = Route & { template: Template };

export const groups: Record<Groups, GroupsRoute> = {
  App: {
    access: ['guest'],
    component: lazy(() => import('src/components/routes/groups/App')),
    template: 'app',
  },
};

export const pages: Record<Pages, PageRoute> = {
  '/': {
    title: 'components.routes.pages.Root.title',
  },
};

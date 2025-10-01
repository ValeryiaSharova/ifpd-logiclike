import React, { Suspense } from 'react';
import { useIntl } from 'react-intl';
import { Navigate } from 'react-router';

import { makeHierarchicalPath } from 'shared';

import { Preloader } from 'src/components/atoms/Preloader';
import { Page } from 'src/components/organisms/Page';
import { groups, pages, pagesRedirect } from 'src/components/routes';
import { Error404 } from 'src/components/routes/pages/Error404';
import { msg } from 'src/i18n/Msg';
import { SwitchMode, allowedGroups } from 'src/navigation';
import { ParsedPageScheme, useRouteMatch } from 'src/navigation/useRouteMatch';

const AuthGate: React.FC<SwitchMode & ParsedPageScheme> = ({
  group,
  mode,
  params,
  scheme,
}) => {
  const intl = useIntl();

  if (!allowedGroups[mode].includes(group)) {
    const url = pagesRedirect[mode];
    const to = makeHierarchicalPath(
      undefined,
      Array.isArray(url) ? url : [url],
      'replace'
    );

    if (to) {
      return <Navigate replace to={to} />;
    }
  }

  const Component = groups[group].component;
  const title = msg(intl, { id: pages[scheme].title, values: params });

  return (
    <Page template={groups[group].template} title={title}>
      <Component params={params} scheme={scheme} title={title} />
    </Page>
  );
};

export const GroupsSwitch: React.FC<SwitchMode> = ({ mode }) => {
  const page = useRouteMatch();

  if (!page) {
    return (
      <Page template="app">
        <Error404 />
      </Page>
    );
  }

  return (
    <Suspense fallback={<Preloader fullScreen />}>
      <AuthGate mode={mode} {...page} />
    </Suspense>
  );
};

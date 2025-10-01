import React, { memo } from 'react';

import { DefaultParams, ParsedPageScheme } from 'src/navigation/useRouteMatch';

export type Components<Key extends string, Params = DefaultParams> = Record<
  Key,
  React.FC<{ title: string; params: Params }>
>;

type Props = Omit<ParsedPageScheme, 'group'> & {
  components: Components<string>;
  title: string;
};

export const Group: React.FC<Props> = memo(
  ({ components, params, scheme, title }) => {
    const Component = components[scheme];

    return <Component params={params} title={title} />;
  },
  (prev, next) =>
    prev.scheme === next.scheme &&
    JSON.stringify(prev.params) === JSON.stringify(next.params)
);

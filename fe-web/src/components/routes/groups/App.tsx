import React from 'react';

import { GroupsToPages } from 'shared';

import { App as AppScreen } from 'src/components/routes/pages/App';
import { Components, Group } from 'src/navigation/Group';
import { ParsedPageScheme } from 'src/navigation/useRouteMatch';

type Props = Omit<ParsedPageScheme, 'group'> & { title: string };

const components: Components<GroupsToPages['App']> = {
  '/': AppScreen,
};

const App: React.FC<Props> = (props) => (
  <Group components={components} {...props} />
);

export default App;

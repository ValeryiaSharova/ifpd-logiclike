import React from 'react';
import { BrowserRouter } from 'react-router';

import { GroupsSwitch } from 'src/navigation/Switch';

export const Router: React.FC = () => (
  <BrowserRouter>
    <GroupsSwitch mode="guest" />
  </BrowserRouter>
);

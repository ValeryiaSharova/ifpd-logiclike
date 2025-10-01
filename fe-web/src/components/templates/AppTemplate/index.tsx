import React from 'react';

import { TemplateProps } from 'src/components/templates/types';

export const AppTemplate: React.FC<TemplateProps> = ({ children }) => (
  <>
    <div className="blockCenter">{children}</div>
  </>
);

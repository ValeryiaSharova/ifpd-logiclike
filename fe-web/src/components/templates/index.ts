import React from 'react';

import { AppTemplate } from 'src/components/templates/AppTemplate';
import { Template, TemplateProps } from 'src/components/templates/types';

export const templateToComponent: Record<Template, React.FC<TemplateProps>> = {
  app: AppTemplate,
};

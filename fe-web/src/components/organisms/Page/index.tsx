import React, { ReactNode, useLayoutEffect } from 'react';
import { useIntl } from 'react-intl';

import { templateToComponent } from 'src/components/templates';
import { Template } from 'src/components/templates/types';
import { msg } from 'src/i18n/Msg';

type Props = {
  children: ReactNode;
  template: Template;
  title?: string;
};

export const Page: React.FC<Props> = ({ children, template, title }) => {
  const intl = useIntl();

  const text = title ?? msg(intl, { id: 'components.organisms.Page.title' });
  const TemplateComponent = templateToComponent[template];

  useLayoutEffect(() => {
    document.title = text;
  }, [text]);

  return <TemplateComponent title={text}>{children}</TemplateComponent>;
};

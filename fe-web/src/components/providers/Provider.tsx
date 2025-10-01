import React, { ReactNode } from 'react';

import { DesignSystemProvider } from 'src/components/providers/DesignSystemProvider';
import { ToastProvider } from 'src/components/providers/ToastProvider';
import { IntlProvider } from 'src/i18n/IntlProvider';

import 'antd/dist/reset.css';

import 'src/styles/fonts.css';
import 'src/styles/global.css';
import 'src/styles/styles.css';
import 'src/styles/variables.css';

type Props = {
  children: ReactNode;
};

export const Provider: React.FC<Props> = ({ children }) => (
  <IntlProvider>
    <DesignSystemProvider>
      <ToastProvider>{children}</ToastProvider>
    </DesignSystemProvider>
  </IntlProvider>
);

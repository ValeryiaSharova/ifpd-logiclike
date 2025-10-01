import App from 'antd/lib/app';
import ConfigProvider from 'antd/lib/config-provider';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const DesignSystemProvider: React.FC<Props> = ({ children }) => (
  <ConfigProvider
    theme={{
      token: { fontFamily: 'var(--FONT_FAMILY_NUNITO)' },
    }}
  >
    <App>{children}</App>
  </ConfigProvider>
);

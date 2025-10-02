import React from 'react';

import { TemplateProps } from 'src/components/templates/types';

import styles from 'src/components/templates/AppTemplate/styles.module.css';

export const AppTemplate: React.FC<TemplateProps> = ({ children }) => (
  <div className={styles.wrapper}>{children}</div>
);

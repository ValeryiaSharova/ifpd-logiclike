import DividerAnt from 'antd/lib/divider';
import React from 'react';

import styles from 'src/components/atoms/Divider/styles.module.css';

type DividerProps = {
  text?: string;
};

export const Divider: React.FC<DividerProps> = ({ text }) => (
  <DividerAnt className={styles.wrapper} orientationMargin={8}>
    {text}
  </DividerAnt>
);

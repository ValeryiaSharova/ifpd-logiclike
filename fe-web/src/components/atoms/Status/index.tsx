import classNames from 'classnames';
import React from 'react';

import styles from 'src/components/atoms/Status/styles.module.css';

export type StatusProps = {
  statusText: string | number;
  count?: number;
  variant: 'sky' | 'red' | 'green';
};

const variantToStyle: Record<StatusProps['variant'], string> = {
  sky: styles.sky,
  red: styles.red,
  green: styles.green,
};

export const Status: React.FC<StatusProps> = ({
  statusText,
  count,
  variant,
}) => (
  <div className={classNames(styles.wrapper, variantToStyle[variant])}>
    <span className="subtitle2">{statusText}</span>
    {count && <span className="subtitle2">{count}</span>}
  </div>
);

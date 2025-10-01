import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import Spin from 'antd/lib/spin';
import React from 'react';

import styles from 'src/components/atoms/Preloader/styles.module.css';

type Props = {
  color?: string;
  fullScreen?: boolean;
  inline?: boolean;
  size?: 'small' | 'large';
};

export const Preloader: React.FC<Props> = ({
  color = 'var(--BLUE_500)',
  fullScreen,
  inline = false,
  size = 'large',
}) => {
  const spin = (
    <Spin
      indicator={<LoadingOutlined spin style={{ color }} />}
      size={size}
      wrapperClassName={inline ? undefined : styles.fullscreen}
    />
  );

  return fullScreen ? <div className="blockCenter">{spin}</div> : spin;
};

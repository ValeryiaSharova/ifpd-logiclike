import ButtonAnt from 'antd/lib/button';
import classNames from 'classnames';
import React, { ReactNode } from 'react';

import { Preloader } from 'src/components/atoms/Preloader';
import { Msg, MsgProps } from 'src/i18n/Msg';

import styles from 'src/components/molecules/Button/styles.module.css';

type Props = {
  disabled?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  loading?: boolean;
  onClick?: () => void;
  title?: MsgProps;
  variant?: 'text' | 'outlined' | 'solid';
  color?: 'primary' | 'danger';
  fullWidth?: boolean;
  size?: 40;
};

const sizeToStyle: Partial<Record<NonNullable<Props['size']>, string>> = {
  40: styles.size40,
};

const propsToStyle: Partial<
  Record<
    NonNullable<Props['color']>,
    Partial<Record<NonNullable<Props['variant']>, string>>
  >
> = {
  danger: {
    outlined: styles.outlinedDanger,
    solid: styles.solidDanger,
    text: '',
  },
  primary: {
    outlined: styles.outlinedPrimary,
    solid: styles.solidPrimary,
    text: styles.textPrimary,
  },
};

export const Button: React.FC<Props> = ({
  disabled,
  htmlType = 'button',
  icon,
  loading,
  onClick,
  title,
  color = 'primary',
  variant = 'solid',
  fullWidth,
  size = 40,
}) => {
  const isDisabled = disabled || !!loading;

  return (
    <ButtonAnt
      block={fullWidth}
      htmlType={htmlType}
      disabled={isDisabled}
      variant={variant}
      className={classNames(
        'button1',
        styles.wrapper,
        propsToStyle[color]?.[variant],
        sizeToStyle[size]
      )}
      icon={loading ? undefined : icon}
      onClick={onClick}
    >
      {loading && <Preloader size="small" inline color={color} />}
      {title && <Msg id={title.id} values={title.values} />}
    </ButtonAnt>
  );
};

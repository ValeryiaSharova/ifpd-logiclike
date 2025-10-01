import classNames from 'classnames';
import React, { AnchorHTMLAttributes, SyntheticEvent } from 'react';
import { Link as RouterLink, useLocation } from 'react-router';

import { Pages, Scheme, makeHierarchicalPath } from 'shared';

import styles from 'src/navigation/styles.module.css';

export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  url: Scheme<Pages>;
  disabled?: boolean;
  children: JSX.Element | string;
  color?: 'black' | 'blue' | 'grey' | 'white';
  size?: 'default' | 'small';
}

const colorToStyle: Record<NonNullable<Props['color']>, string> = {
  black: styles.black,
  blue: styles.blue,
  grey: styles.grey,
  white: styles.white,
};
const sizeToStyle: Record<NonNullable<Props['size']>, string> = {
  default: 'body2 semibold',
  small: 'caption1',
};

export const Link: React.FC<Props> = ({
  url,
  disabled,
  children,
  color = 'blue',
  size = 'default',
  ...props
}) => {
  const location = useLocation();

  const to = makeHierarchicalPath(location, [url], 'detect');

  if (!to) {
    return null;
  }

  const onClickHandler = (e: SyntheticEvent) => {
    if (disabled) {
      e.preventDefault();
    }
  };

  return (
    <RouterLink
      onClick={onClickHandler}
      to={to}
      className={classNames(
        styles.link,
        colorToStyle[color],
        sizeToStyle[size]
      )}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

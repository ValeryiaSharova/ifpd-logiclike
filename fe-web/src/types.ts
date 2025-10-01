import Icon from '@ant-design/icons';
import type { GetProps } from 'antd/lib/_util/type';
import { ReactNode } from 'react';

export type ID = number;
export type UID = string;
export type Link = string;

/**
 * @example "2020-04-02"
 */
export type DateISO8601 = string;

/**
 * @example "2020-04-02T08:02:17-05:00"
 */
export type DateTimeISO8601 = string;

export type ValueOf<T> = T[keyof T];

export type Toast = {
  id: UID;
  message: string;
  description?: string;
  type: 'success' | 'info' | 'error' | 'warning';
  icon?: ReactNode;
};

export type IconProps = Partial<GetProps<typeof Icon>>;

import { escapeLiteral } from 'pg';

import { EnumsOrderDirection } from 'src/_generated';
import { ID } from 'src/types';

export type Filters<Additional> = {
  cursor_prev?: ID;
  cursor_next?: ID;
} & Additional;
export type Orders<Additional> = {
  order_dir?: EnumsOrderDirection;
} & Additional;

export const joinColumns = <T extends object>(
  fields: (keyof Omit<T, 'id'>)[]
): string => fields.join(', ');

export const arrayToIn = (items: (number | string)[]) => {
  const normalized = items.map((item) =>
    typeof item === 'string' ? escapeLiteral(item) : item
  );

  if (!normalized.length) {
    return '= 0';
  }

  return normalized.length > 1
    ? `IN (${normalized.join(',')})`
    : `= ${normalized[0]}`;
};

export const arrayToNotIn = (items: (number | string)[]) => {
  const normalized = items.map((item) =>
    typeof item === 'string' ? escapeLiteral(item) : item
  );

  if (!normalized.length) {
    return '';
  }

  return normalized.length > 1
    ? `NOT IN (${normalized.join(',')})`
    : `!= ${normalized[0]}`;
};

export const jsonbFindByItem = (
  column: string,
  key: string,
  item: string | number | object
) =>
  `${column} -> '${key}' ${typeof item === 'string' ? `?` : '@>'} '${typeof item === 'object' ? JSON.stringify(item) : item}'`;

export const jsonbFindByArray = (
  column: string,
  key: string,
  items: string[]
) =>
  `${column} -> '${key}' ?| array${JSON.stringify(items).replaceAll('"', "'")}`;

export const jsonbFindByArrayInArray = (key: string, items: string[]) =>
  `${key} ?| array${JSON.stringify(items).replaceAll('"', "'")}`;

export const pagination = (
  table: string,
  field: string,
  direction: EnumsOrderDirection,
  { cursor_prev, cursor_next }: Filters<{}>
) => {
  const isDesc = direction === 'desc';
  const getCursor = `(SELECT ${field} FROM ${table} WHERE id = ${cursor_prev || cursor_next})`;

  return {
    order: `${field as string} ${cursor_prev ? (direction === 'asc' ? 'desc' : 'asc') : direction.toUpperCase()}`,
    whereCursor: (() => {
      if (cursor_prev) {
        return where[isDesc ? 'less' : 'more'](field, getCursor);
      }

      if (cursor_next) {
        return where[isDesc ? 'more' : 'less'](field, getCursor);
      }

      return '';
    })(),
    normalize: <T extends { id: ID }>(data: T[]) =>
      cursor_prev ? data.reverse() : data,
  };
};

export const where = {
  is: (name: string, value?: string | number) =>
    value
      ? `${name} = ${typeof value === 'string' ? `'${value}'` : value}`
      : '',
  in: (name: string, value: (number | string)[]) =>
    value.length ? `${name} ${arrayToIn(value)}` : '',
  notIn: (name: string, value: (number | string)[]) =>
    value.length ? `${name} ${arrayToNotIn(value)}` : '',
  boolean: (name: string, value?: boolean) =>
    value !== undefined ? `${name} = ${value ? 'TRUE' : 'FALSE'}` : '',
  more: (name: string, value?: number | string) =>
    value ? `${name} < ${value}` : '',
  less: (name: string, value?: number | string) =>
    value ? `${name} > ${value}` : '',
  ilike: (name: string, key: `$${number}`, value?: string) =>
    value !== undefined ? `${name}::text ILIKE ${key}` : '',
  dataIncludeItem: (
    column: string,
    key: string,
    value?: string | number | object
  ) => (value !== undefined ? `${jsonbFindByItem(column, key, value)}` : ''),
  datasIncludeItem: (
    column: string,
    keys: string[],
    value?: string | number | object
  ) =>
    value !== undefined
      ? `(${keys.map((key) => jsonbFindByItem(column, key, value)).join(' OR ')})`
      : '',
  dataIncludeArray: (column: string, key: string, values: string[]) =>
    values.length ? `${jsonbFindByArray(column, key, values)}` : '',
  dataIncludeArrayInArray: (key: string, values: string[]) =>
    values.length ? `${jsonbFindByArrayInArray(key, values)}` : '',
};

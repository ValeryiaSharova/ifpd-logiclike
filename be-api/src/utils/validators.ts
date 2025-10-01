import { PG_MAX_SAFE_INTEGER } from 'shared';

import { ID } from 'src/types';

export const checkValidStringToInteger = (
  value: number | number[] | string | string[]
): boolean =>
  Array.isArray(value)
    ? value.every((value) => checkValidStringToInteger(value))
    : !(
        isNaN(Number(value)) ||
        !Number.isInteger(Number(value)) ||
        Number(value) > PG_MAX_SAFE_INTEGER
      );

export const checkAndRun = async <T>(
  id: null | number | number[] | string | string[],
  callback: () => Promise<T>
): Promise<T | undefined> =>
  id && (!Array.isArray(id) || id.length) && checkValidStringToInteger(id)
    ? callback()
    : undefined;

export const isListsAreConsistent = <Item extends { id: ID }>(
  list: Item[] | undefined,
  ids: ID[]
) => {
  if (!list) {
    return false;
  }

  const flat = list.map(({ id }) => id);

  return ids.every((item) => flat.includes(item));
};

export const isArraysEqual = (
  oldArr: (string | number)[],
  newArr: (string | number)[]
): boolean => {
  const set = new Set(newArr);

  return !oldArr.filter((item) => !set.has(item)).length;
};

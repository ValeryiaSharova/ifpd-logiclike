import { Environment, Origin } from './constants';

export const env = <T>(
  options: Record<Environment, T>
): Record<Environment, T> => options;

export const makeOrigin = (
  { protocol, host, port }: Origin,
  fixedHost?: string
) =>
  `${protocol}://${fixedHost ?? host}${host === 'localhost' ? `:${port}` : ''}`;

export const createArray = <T>(length: number, value?: T) =>
  new Array(length).fill(value ?? '');

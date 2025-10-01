export type Prefixify<
  Keys extends string,
  Prefix extends string,
  Separator extends string = ':',
> = `${Prefix}${Separator}${Keys}`;

export type ID = number;
export type UID = string;
export type Comment = string;
export type Coordinate = number;
export type Email = string;
export type Link = string;
export type Timestamp = Date;
export type Token = string;

/**
 * @example "2020-04-02"
 */
export type DateISO8601 = string;

/**
 * @example "2020-04-02T08:02:17-05:00"
 */
export type DateTimeISO8601 = string;

export type Roles = 'guest';

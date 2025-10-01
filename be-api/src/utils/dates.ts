import dayjs from 'dayjs';

import { DateTimeISO8601 } from 'src/types';

export const toISO8601 = (date?: string | Date): DateTimeISO8601 =>
  dayjs(date).format();

export const rollNowDateBack = (days: number = 5): DateTimeISO8601 =>
  dayjs().subtract(days, 'day').format();

export const rollNowDateForward = (days: number = 5): DateTimeISO8601 =>
  dayjs().add(days, 'day').format();

export const rollNowTimeForward = (seconds: number = 60): DateTimeISO8601 =>
  dayjs().add(seconds, 'second').format();

export const isAfterNow = (date: DateTimeISO8601): boolean =>
  dayjs().isAfter(dayjs(date));

export const isAfterDate = (
  expectedBeforeDate: string | Date,
  expectedAfterDate?: string | Date
) => dayjs(expectedAfterDate).isAfter(dayjs(expectedBeforeDate));

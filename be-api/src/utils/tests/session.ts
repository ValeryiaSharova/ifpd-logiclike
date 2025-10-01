import { Response } from 'supertest';

import { isAfterDate } from 'src/utils/dates';

export const isAuthenticated = (headers: Response['headers']): boolean => {
  const expiresMatch = headers['set-cookie']?.[0].match(/Expires=([^;]+)/);

  return expiresMatch ? !isAfterDate(expiresMatch[1]) : false;
};

import { Pool } from 'pg';

import { INTEGRATIONS } from 'src/constants/env';

export const postgres = new Pool({
  connectionString: INTEGRATIONS.postgres.url,
});

// Stub for pg-mem
export const backup = {
  restore: () => {},
};

export const isPostgresConnected = async (): Promise<boolean> => {
  try {
    await postgres.query('SELECT NOW()');

    return true;
  } catch (err) {
    return false;
  }
};

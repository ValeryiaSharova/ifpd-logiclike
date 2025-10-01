import dotenv from 'dotenv-flow';

import { ROOT } from 'src/constants/process';

const result = dotenv.config({ path: ROOT });

if (result.error) {
  throw result.error;
}

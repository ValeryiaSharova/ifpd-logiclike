import { rollNowDateBack, rollNowDateForward } from 'src/utils/dates';

export const expiredDate = rollNowDateBack();
export const notExpiredDate = rollNowDateForward();

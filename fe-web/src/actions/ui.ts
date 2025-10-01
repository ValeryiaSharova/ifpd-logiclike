import { createEvent } from 'effector';

import { Locales } from 'shared';

import { Toast } from 'src/types';

export const access = {
  changeLocale: createEvent<Locales>(),
};

export const toasts = {
  add: createEvent<Omit<Toast, 'id'>>(),
  remove: createEvent<Toast['id']>(),
};

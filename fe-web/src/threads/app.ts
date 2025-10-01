import { sample } from 'effector';

import { IdPut } from 'src/_generated';
import { actions } from 'src/actions';

export const updateIdeas = sample({
  clock: actions.api['/'].GET.doneData,
  fn: () => ({}) as IdPut,
  target: actions.api['/:id'].PUT,
});

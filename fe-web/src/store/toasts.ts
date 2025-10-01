import { createStore } from 'effector';
import { v4 } from 'uuid';

import { actions } from 'src/actions';
import { Toast } from 'src/types';

type State = Toast[];

const initialState: State = [];

export const $toasts = createStore<State>(initialState)
  .on(
    actions.ui.toasts.add,
    (state, payload): State => [...state, { ...payload, id: v4() }]
  )
  .on(
    actions.ui.toasts.remove,
    (state, payload): State => state.filter((item) => item.id !== payload)
  );

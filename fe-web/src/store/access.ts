import { createStore } from 'effector';

import { AppIdea } from 'src/_generated';
import { actions } from 'src/actions';

type State = {
  ideas: AppIdea[];
};

const initialState: State = {
  ideas: [],
};

const $access = createStore<State>(initialState).on(
  actions.api['/'].GET.doneData,
  (state, payload): State => ({
    ...state,
    ideas: payload.list,
  })
);

export const $ideas = $access.map((state) => state.ideas);

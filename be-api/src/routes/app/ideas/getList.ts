import { AppIdeasGet, Handler } from 'src/_generated';
import { getListIdeas } from 'src/integrations/postgres/storage/app/ideas';
import { config } from 'src/utils/navigation';

export const { onSuccess, options } = config('Get ideas list', {
  tag: 'app',
  mode: 'getList',
  roles: ['guest'],
  schema: {
    response: {
      model: 'appIdea',
      errors: [],
    },
  },
});

export const handler: Handler<AppIdeasGet> = async () => {
  const ideas = await getListIdeas();

  return onSuccess(ideas);
};

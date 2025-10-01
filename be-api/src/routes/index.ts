import * as app from 'src/routes/app';
import { router } from 'src/utils/navigation';

export const routes = router({
  '/': {
    GET: app.ideas.getList,
  },

  '/:id': {
    PUT: app.ideas.update,
  },
});

import * as app from 'src/routes/app';
import { router } from 'src/utils/navigation';

export const routes = router({
  '/app/ideas': {
    GET: app.ideas.getList,
  },

  '/app/ideas/:id': {
    PUT: app.ideas.update,
  },

  '/app/ip-voices': {
    GET: app.ipVoices.get,
  },
});

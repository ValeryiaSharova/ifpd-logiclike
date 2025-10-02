import { ERRORS, HTTP_STATUS } from 'shared';

import { AppIdeasIdPut, Handler } from 'src/_generated';
import {
  getIdeaById,
  updateIdeaById,
} from 'src/integrations/postgres/storage/app/ideas';
import {
  createIpVoice,
  getIpVoiceByIp,
  updateIpVoiceByIp,
} from 'src/integrations/postgres/storage/app/ip_voices';
import { config } from 'src/utils/navigation';
import { getClientIp } from 'src/utils/server';
import { checkAndRun } from 'src/utils/validators';

export const { onSuccess, options } = config('Update idea by id', {
  tag: 'app',
  mode: 'putItem',
  roles: ['guest'],
  schema: {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' },
      },
      additionalProperties: false,
    },
    response: {
      model: 'appIdea',
      errors: [HTTP_STATUS.BAD_REQUEST],
    },
  },
});

export const handler: Handler<AppIdeasIdPut> = async (request, reply) => {
  const { id } = request.params;

  const idea = await checkAndRun(id, async () => getIdeaById(Number(id)));

  if (!idea) {
    return reply
      .status(HTTP_STATUS.NOT_FOUND)
      .send({ error: ERRORS.NOT_FOUND_IDEA });
  }

  const clientIp = getClientIp(request);

  if (clientIp === 'unknown') {
    return reply
      .status(HTTP_STATUS.BAD_REQUEST)
      .send({ error: ERRORS.BAD_REQUEST });
  }

  const ip = await getIpVoiceByIp(clientIp);

  if (!ip) {
    const [updatedIdea] = await Promise.all([
      updateIdeaById(idea.id, { count: idea.count + 1, name: idea.name }),
      createIpVoice({ ideas_ids: [Number(id)], ip: clientIp }),
    ]);

    return onSuccess(updatedIdea);
  }

  if (ip?.ideas_ids.length === 10) {
    return reply
      .status(HTTP_STATUS.CONFLICT)
      .send({ error: ERRORS.TOO_MANY_VOICES });
  }

  if (ip.ideas_ids.includes(Number(id))) {
    return reply
      .status(HTTP_STATUS.CONFLICT)
      .send({ error: ERRORS.ALREADY_VOTED });
  }

  const [updatedIdea] = await Promise.all([
    updateIdeaById(idea.id, { count: idea.count + 1, name: idea.name }),
    updateIpVoiceByIp({
      ideas_ids: [...ip.ideas_ids, Number(id)],
      ip: clientIp,
    }),
  ]);

  return onSuccess(updatedIdea);
};

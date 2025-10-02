import { AppIpVoicesGet, Handler } from 'src/_generated';
import { getIpVoiceByIp } from 'src/integrations/postgres/storage/app/ip_voices';
import { config } from 'src/utils/navigation';
import { getClientIp } from 'src/utils/server';

export const { onSuccess, options } = config('Get current ip voices', {
  tag: 'app',
  mode: 'getItem',
  roles: ['guest'],
  schema: {
    response: {
      model: 'appIpVoice',
      errors: [],
    },
  },
});

export const handler: Handler<AppIpVoicesGet> = async (request) => {
  const clientIp = getClientIp(request);

  const ipVoices = await getIpVoiceByIp(clientIp);

  if (!ipVoices) {
    return onSuccess({ ideas_ids: [], ip: clientIp });
  }

  return onSuccess(ipVoices);
};

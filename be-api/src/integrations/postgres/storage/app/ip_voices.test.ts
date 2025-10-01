import { afterAll, afterEach, describe, expect, test } from 'vitest';

import {
  createIpVoice,
  getIpVoiceByIp,
  updateIpVoiceByIp,
} from 'src/integrations/postgres/storage/app/ip_voices';
import { mock as mockIpVoice } from 'src/integrations/postgres/storage/app/ip_voices.mock';
import { restoreDB, stopDB } from 'src/utils/tests/db';

afterEach(restoreDB);
afterAll(stopDB);

describe('app/ip_voices storage', () => {
  test('createIpVoice works correctly', async () => {
    const params = mockIpVoice({});

    const result = await createIpVoice(params);

    expect(result).toEqual({ ...params });
  });

  test('getIpVoiceByIp works correctly', async () => {
    const idea = await createIpVoice(mockIpVoice({}));

    const result = await getIpVoiceByIp(idea.ip);

    expect(result).toEqual(idea);
  });

  test('updateIpVoiceByIp works correctly', async () => {
    const idea = await createIpVoice(mockIpVoice({}));

    const result = await updateIpVoiceByIp({ ...idea, ideas_ids: [1, 2] });

    expect(result).toEqual({ ...idea, ideas_ids: [1, 2] });
  });
});

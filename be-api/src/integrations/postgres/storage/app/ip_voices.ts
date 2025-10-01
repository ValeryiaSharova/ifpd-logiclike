import { postgres } from 'src/integrations/postgres/connection';
import { AppIpVoices } from 'src/integrations/postgres/storage/app/types';
import { joinColumns } from 'src/integrations/postgres/utils';

const COLUMNS = joinColumns<AppIpVoices>(['ideas_ids', 'ip']);

export const createIpVoice = async ({
  ideas_ids,
  ip,
}: AppIpVoices): Promise<AppIpVoices> => {
  const { rows } = await postgres.query({
    text: `
      INSERT INTO app.ip_voices (${COLUMNS})
      VALUES($1, $2)
      RETURNING *`,
    values: [JSON.stringify(ideas_ids), ip],
  });

  return rows[0];
};

export const getIpVoiceByIp = async (
  ip: AppIpVoices['ip']
): Promise<AppIpVoices | undefined> => {
  const { rows } = await postgres.query({
    text: `
      SELECT ${COLUMNS}
      FROM app.ip_voices
      WHERE ip = $1`,
    values: [ip],
  });

  return rows[0];
};

export const updateIpVoiceByIp = async ({
  ideas_ids,
  ip,
}: AppIpVoices): Promise<AppIpVoices> => {
  const { rows } = await postgres.query({
    text: `
      UPDATE app.ip_voices
      SET ideas_ids = $2
      WHERE ip = $1
      RETURNING *`,
    values: [ip, JSON.stringify(ideas_ids)],
  });

  return rows[0];
};

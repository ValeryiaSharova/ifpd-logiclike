import { postgres } from 'src/integrations/postgres/connection';
import { AppIdeas } from 'src/integrations/postgres/storage/app/types';
import { joinColumns } from 'src/integrations/postgres/utils';

const COLUMNS = joinColumns<AppIdeas>(['count', 'name']);

export const createIdea = async ({
  count,
  name,
}: Omit<AppIdeas, 'id'>): Promise<AppIdeas> => {
  const { rows } = await postgres.query({
    text: `
      INSERT INTO app.ideas (${COLUMNS})
      VALUES($1, $2)
      RETURNING *`,
    values: [count, name],
  });

  return rows[0];
};

export const getIdeaById = async (
  id: AppIdeas['id']
): Promise<AppIdeas | undefined> => {
  const { rows } = await postgres.query({
    text: `
      SELECT id, ${COLUMNS}
      FROM app.ideas
      WHERE id = $1`,
    values: [id],
  });

  return rows[0];
};

export const getListIdeas = async (): Promise<AppIdeas[]> => {
  const { rows } = await postgres.query({
    text: `
      SELECT id, ${COLUMNS}
      FROM app.ideas
      ORDER BY count DESC`,
  });

  return rows;
};

export const updateIdeaById = async (
  id: AppIdeas['id'],
  { count, name }: Omit<AppIdeas, 'id'>
): Promise<AppIdeas> => {
  const { rows } = await postgres.query({
    text: `
      UPDATE app.ideas
      SET count = $2, name = $3
      WHERE id = $1
      RETURNING *`,
    values: [id, count, name],
  });

  return rows[0];
};

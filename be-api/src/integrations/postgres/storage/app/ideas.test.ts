import { afterAll, afterEach, describe, expect, test } from 'vitest';

import {
  createIdea,
  getIdeaById,
  getListIdeas,
  updateIdeaById,
} from 'src/integrations/postgres/storage/app/ideas';
import { mock as mockIdea } from 'src/integrations/postgres/storage/app/ideas.mock';
import { restoreDB, stopDB } from 'src/utils/tests/db';

afterEach(restoreDB);
afterAll(stopDB);

describe('app/ideas storage', () => {
  test('createIdea works correctly', async () => {
    const params = mockIdea({});

    const result = await createIdea(params);

    expect(result).toEqual({ ...params, id: expect.any(Number) });
  });

  test('getIdeaById works correctly', async () => {
    const idea = await createIdea(mockIdea({}));

    const result = await getIdeaById(idea.id);

    expect(result).toEqual(idea);
  });

  test('getIdeaById returns undefined for non-existent id', async () => {
    const result = await getIdeaById(999);

    expect(result).toBeUndefined();
  });

  test('getListIdeas works correctly', async () => {
    const ideas = await Promise.all(
      Array.from({ length: 10 }).map((_, index) =>
        createIdea(mockIdea({ name: `Idea ${index}`, count: index }))
      )
    );

    const result = await getListIdeas();

    expect(result).toEqual(ideas.sort((a, b) => b.count - a.count));
  });

  test('updateIdeaById works correctly', async () => {
    const idea = await createIdea(mockIdea({}));

    const result = await updateIdeaById(idea.id, {
      ...idea,
      count: idea.count + 1,
    });

    expect(result).toEqual({ ...idea, count: idea.count + 1 });
  });
});

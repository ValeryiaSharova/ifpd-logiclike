import FastifySessionPlugin from '@fastify/session';

const Store = FastifySessionPlugin.Store;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class PostgreSQLStore extends Store {
  closed?: boolean;
  pruneTimer?: NodeJS.Timeout;

  constructor() {
    super();
  }

  #clearPruneTimer() {
    if (this.pruneTimer) {
      clearTimeout(this.pruneTimer);
      this.pruneTimer = undefined;
    }
  }

  async close() {
    this.closed = true;
    this.#clearPruneTimer();
  }
}

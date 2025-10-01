/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = async (pgm) => {
  await pgm.createSchema('app');

  await pgm.createTable(
    { schema: 'app', name: 'ideas' },
    {
      id: {
        type: 'bigserial',
        primaryKey: true,
        notNull: true,
      },
      name: {
        type: 'text',
        notNull: true,
      },
      count: {
        type: 'integer',
        notNull: true,
      },
    }
  );

  await pgm.createTable(
    { schema: 'app', name: 'ip_voices' },
    {
      ip: {
        type: 'inet',
        primaryKey: true,
        notNull: true,
      },
      ideas_ids: {
        type: 'jsonb',
        notNull: true,
      },
    }
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = async (pgm) => {
  await pgm.dropTable({ schema: 'app', name: 'ip_list' });
  await pgm.dropTable({ schema: 'app', name: 'ideas' });

  await pgm.dropSchema('app');
};

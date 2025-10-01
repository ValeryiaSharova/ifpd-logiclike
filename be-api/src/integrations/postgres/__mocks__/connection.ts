import { DataType, newDb } from 'pg-mem';

const internalDB = newDb({});

(internalDB as any).searchPath.push('app');

internalDB.public.registerOperator({
  operator: '?',
  left: DataType.jsonb,
  right: DataType.text,
  returns: DataType.bool,
  implementation: (a, b) => a.includes(b),
});

internalDB.public.registerFunction({
  name: 'jsonb_set',
  args: [DataType.jsonb, DataType.text, DataType.jsonb, DataType.bool],
  returns: DataType.jsonb,
  implementation: (original, path, newData, inject) => {
    const pathParts = path.replace(/\{|\}|\"/g, '').split(',');
    const result = JSON.parse(JSON.stringify(original));

    let current = result;

    while (pathParts.length) {
      const currentPart = pathParts.shift();

      if (current[currentPart] === undefined) {
        if (inject) {
          current[currentPart] = {};
        } else {
          return original;
        }
      }

      if (pathParts.length === 0) {
        current[currentPart] = newData;
      } else {
        current = current[currentPart];
      }
    }

    return result;
  },
});

internalDB.public.none(process.env.TESTS_INITIAL_MIGRATION ?? '');

const { Pool } = internalDB.adapters.createPg();

export const postgres = new Pool();
export const backup = internalDB.backup();

export const isPostgresConnected = async (): Promise<boolean> => true;

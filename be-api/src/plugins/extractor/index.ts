import { CompilerOptions, ExtractorOptions } from 'fastify-extract-definitions';
import { bannerComment } from 'fastify-extract-definitions/build/src/constants';
import { prettify } from 'fastify-extract-definitions/build/src/prettify';
import { save } from 'fastify-extract-definitions/build/src/save';
import { JSONSchema4 } from 'json-schema';

import { MODE, PUBLIC_ENV } from 'src/constants/env';
import * as Validators from 'src/plugins/extractor/extractValidators';

const compilerOptions: CompilerOptions = {
  style: {
    singleQuote: true,
    bracketSpacing: true,
    printWidth: 80,
    trailingComma: 'es5',
  },
  unreachableDefinitions: true,
};

const getData = (schema: JSONSchema4) =>
  Object.entries(schema.properties ?? {}).reduce<{
    validators: Validators.RawSchema;
  }>(
    (acc, [, { properties = {} }]) => {
      for (const method in properties) {
        const { title, properties: payload } = properties[method];

        Validators.get(method, title ?? '', acc.validators, payload);
      }

      return acc;
    },
    { validators: Validators.initialState }
  );

const compileText = (
  validators: Validators.NormalizedSchema
) => `${bannerComment}
  import * as yup from 'yup';
  import { Events } from 'src/i18n';

  const _msg = (message: Events): Events => message;

  export const validators = {${validators}};`;

const saveText = async (text: string) => {
  const prettier = await prettify(compilerOptions);
  const formatted = await prettier(text);

  await save(formatted, '../fe-web/src/utils/api.ts');
};

export const extractorConfig: ExtractorOptions = {
  enabled: PUBLIC_ENV === 'local' && MODE !== 'test',
  ignoreHead: true,
  outputs: {
    '../be-api/src/_generated.ts': {
      target: 'serverTypes',
    },
    '../fe-web/src/_generated.ts': {
      target: 'clientTypes',
    },
  },
  compilerOptions,
  onSchemaReady: async (schema) => {
    const { validators } = getData(schema);

    const text = compileText(Validators.normalize(validators));

    await saveText(text);
  },
};

import { JSONSchema4 } from 'json-schema';

export type RawSchema = {
  title: string;
  schema: JSONSchema4;
}[];

export type NormalizedSchema = string;

export const initialState: RawSchema = [];

const methodsWithBody = ['POST', 'PUT', 'PATCH'];

const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const decapitalize = (string: string) =>
  string.charAt(0).toLowerCase() + string.slice(1);

const splitSchema = (
  schema: JSONSchema4,
  title: string
): Record<string, JSONSchema4> | Record<string, JSONSchema4>[] => {
  const getSchemas = (schema: JSONSchema4, title: string) => {
    const result: Record<
      string,
      Omit<JSONSchema4, 'required'> & { required: string[] }
    > = {};

    const required = (schema.required ?? []) as string[];
    const properties = schema.properties ?? {};

    for (const property in properties) {
      const field = properties[property];
      const key = field.$comment ? title + capitalize(field.$comment) : title;

      if (!result[key]) {
        result[key] = { ...schema, required: [], properties: {} };
      }

      if (required.includes(property)) {
        result[key].required.push(property);
      }

      result[key].properties[property] = field;
    }

    return result;
  };

  if (schema.oneOf?.length) {
    const arrayOfSchemas = schema.oneOf.map((item) => ({
      schema: { ...item, title: item.title },
      title,
    }));

    const correctSchemas = arrayOfSchemas.map(({ schema, title }) =>
      getSchemas(schema, schema.title ? decapitalize(schema.title) : title)
    );

    return correctSchemas;
  }

  return getSchemas(schema, title);
};

const handleProperties = (
  properties: JSONSchema4['properties'],
  required: JSONSchema4['required'] = []
) => {
  if (!properties) {
    return '';
  }

  const _required = (required ?? []) as string[];

  const renderProperty = (name: string, item: JSONSchema4): string => {
    let line: string = `yup`;

    if (item.oneOf) {
      line += `.mixed().oneOf([`;

      item.oneOf.forEach((option: JSONSchema4) => {
        line += `${renderProperty(name, option)},`;
      });

      line += `])`;
    }

    if (item.type === 'number') {
      line += '.number()';
    }

    if (item.type === 'integer') {
      line += `.number().integer(_msg('error.field.integer'))`;
    }

    if (item.type === 'string') {
      line += item.format === 'date-time' ? '.date()' : '.string()';
    }

    if (item.type === 'boolean') {
      line += '.bool()';
    }

    if (item.type === 'object') {
      line += '.object()';

      if (item.properties) {
        line += `.shape({ ${handleProperties(
          item.properties,
          item.required
        )} })`;
      }
    }

    if (item.type === 'array') {
      const items = ((Array.isArray(item.items) ? item.items[0] : item.items) ??
        {}) as JSONSchema4;

      if (items.enum) {
        line += `.array().of(yup.string().oneOf(${JSON.stringify(items.enum)}))`;
      } else if (items.type === 'number') {
        line += `.array().of(yup.number())`;
      } else if (items.type === 'integer') {
        line += `.array().of(yup.number().integer(_msg('error.field.integer')))`;
      } else if (items.type === 'string') {
        line += `.array().of(yup.string())`;
      } else {
        line += `.array().of(yup.object().shape({ ${handleProperties(
          items.properties,
          items.required
        )} }))`;
      }

      if (item.minItems) {
        line += `.min(${item.minItems}, _msg('error.array.minLength'))`;
      }
    }

    if (item.enum) {
      line += `.oneOf(${JSON.stringify(item.enum)})`;
    }

    if (
      _required.includes(name) ||
      (item.minLength && item.type === 'string')
    ) {
      line += `.required(_msg('error.field.required'))`;
    }

    if (item.maxLength) {
      line += `.max(${item.maxLength}, _msg('error.field.maxLength'))`;
    }

    if (typeof item.minimum !== 'undefined') {
      line += `.min(${item.minimum}, _msg('error.field.minimum'))`;
    }

    if (item.maximum) {
      line += `.max(${item.maximum}, _msg('error.field.maxLength'))`;
    }

    if (item.minLength) {
      line += `.min(${item.minLength}, _msg('${name.includes('assword') ? 'error.password.minLength' : 'error.value.minLength'}'))`;
    }

    if (item.format === 'email') {
      line += `.email(_msg('error.email.wrongFormat'))`;
    }

    return line;
  };

  return Object.entries(properties ?? {}).reduce<string>(
    (itemAccumulator, [name, item]) =>
      itemAccumulator + `'${name}': ${renderProperty(name, item)},`,
    ''
  );
};

export const get = (
  method: string,
  title: string,
  acc: RawSchema,
  { Body }: Record<string, JSONSchema4> = {}
) => {
  if (methodsWithBody.includes(method) && title && Body) {
    const schemas = splitSchema(Body, decapitalize(title));

    if (Array.isArray(schemas)) {
      schemas.forEach((schema) => {
        for (const key in schema) {
          acc.push({ title: key, schema: schema[key] });
        }
      });
      return;
    }

    for (const key in schemas) {
      acc.push({ title: key, schema: schemas[key] });
    }
  }
};

export const normalize = (schema: RawSchema): NormalizedSchema =>
  schema.reduce<string>((acc, config) => {
    const fields = handleProperties(
      config.schema.properties,
      config.schema.required
    );

    return acc + `${config.title}: yup.object().shape({ ${fields} }),\n\n`;
  }, '');

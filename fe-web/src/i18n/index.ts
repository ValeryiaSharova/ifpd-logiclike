import { Locales } from 'shared';

export type Dictionary = Awaited<
  typeof import('src/i18n/dictionaries/ru')
>['ru'];

export type DictionaryKey = keyof Dictionary;

/**
 * As keys are used BCP 47 locale identifiers
 * (see ECMAScript Intl standard)
 */
export const locales: {
  [Locale in Locales]: {
    title: string;
    dictionary: () => Promise<Record<Locale, Dictionary>>;
  };
} = {
  ru: {
    title: 'Русский',
    dictionary: () => import('src/i18n/dictionaries/ru'),
  },
} as const;

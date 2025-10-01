import React, { Fragment, ReactNode, useLayoutEffect, useState } from 'react';
import { IntlProvider as Provider } from 'react-intl';

import { Locales, defaultLocale } from 'shared';

import { Preloader } from 'src/components/atoms/Preloader';
import { Dictionary, locales } from 'src/i18n';
import { changeLocale } from 'src/utils/dates';

type Props = {
  children: ReactNode;
};

const useDictionary = (locale: Locales): Dictionary | undefined => {
  const [messages, setMessages] = useState<Dictionary>();

  useLayoutEffect(() => {
    void (async () => {
      const data = await locales[locale].dictionary();

      setMessages(data[locale as never]);
    })();

    changeLocale(locale);
  }, [locale]);

  return messages;
};

export const IntlProvider: React.FC<Props> = ({ children }) => {
  const messages = useDictionary('ru');

  if (!messages) {
    return <Preloader fullScreen />;
  }

  return (
    <Provider
      defaultLocale={defaultLocale}
      locale="ru"
      messages={messages}
      textComponent={Fragment}
    >
      {children}
    </Provider>
  );
};

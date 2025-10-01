import React, { ReactNode } from 'react';
import { FormattedMessage, IntlShape as IIntlShape } from 'react-intl';

import { DictionaryKey } from 'src/i18n';

export type IntlShape = IIntlShape;

export interface MsgProps {
  id: DictionaryKey;
  values?: Record<string, ReactNode>;
}

export const msg = (intl: IntlShape, { id, values }: MsgProps): string =>
  intl.formatMessage({ id }, values as never);

export const Msg: React.FC<MsgProps> = ({ id, values }) => (
  <FormattedMessage id={id} values={values} />
);

export const possibleMsg = (intl: IntlShape, id?: string): string | null =>
  id && intl.messages[id] ? msg(intl, { id } as MsgProps) : null;

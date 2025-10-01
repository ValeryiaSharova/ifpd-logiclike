import {
  CheckOutlined,
  CloseOutlined,
  ExclamationOutlined,
} from '@ant-design/icons';
import notification from 'antd/lib/notification';
import { useUnit } from 'effector-react';
import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { actions } from 'src/actions';
import { errorToDictionaryKey } from 'src/constants/notifications';
import { msg } from 'src/i18n/Msg';
import { $toasts } from 'src/store/toasts';
import { Toast } from 'src/types';

type Props = {
  children: ReactNode;
};

const RenderToast: React.FC = () => {
  const intl = useIntl();
  const toast = useUnit($toasts).at(-1);

  const makeText = (text?: string): string => {
    const id = errorToDictionaryKey[text as never];

    return typeof text === 'object' && 'id' in text
      ? msg(intl, text)
      : id
        ? msg(intl, { id })
        : (text ?? '');
  };

  const icons: Partial<Record<Toast['type'], ReactNode>> = {
    error: <CloseOutlined size={20} color="var(--GREY_0)" />,
    success: <CheckOutlined size={20} color="var(--GREY_0)" />,
    warning: <ExclamationOutlined size={20} color="var(--GREY_0)" />,
  };

  if (toast) {
    const { id: key, message, description, type } = toast;
    const icon = icons[type];

    notification[type as Toast['type']]({
      key,
      icon,
      message: makeText(message),
      description: makeText(description),
      onClose: () => actions.ui.toasts.remove(key),
    });
  }

  return null;
};

export const ToastProvider: React.FC<Props> = ({ children }) => (
  <>
    <RenderToast />

    {children}
  </>
);

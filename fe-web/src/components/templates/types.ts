import { ReactNode } from 'react';

export type Template = 'app';

export type TemplateProps = {
  title: string | null;
  children: ReactNode;
};

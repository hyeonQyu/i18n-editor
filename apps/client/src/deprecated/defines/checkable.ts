import { ReactNode } from 'react';

export interface Checkable<T> {
  type: T;
  checked: boolean;
  label: ReactNode;
  required?: boolean;
}

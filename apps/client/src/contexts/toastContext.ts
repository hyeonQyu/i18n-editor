import React, { RefObject } from 'react';
import { Toast } from 'primereact/toast';

export interface IToastContext {
  toastRef: RefObject<Toast>;
}

export const ToastContext = React.createContext<IToastContext>({
  toastRef: { current: null },
});

export const useToastContext = () => React.useContext(ToastContext);

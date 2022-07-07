import { AlertType } from '@components/common/alert/defines/alertDefines';
import { useRecoilState } from 'recoil';
import { alertInfoState } from 'stores/store';
import { useCallback } from 'react';
import { AlertInfoState } from '@stores/define/alert';

export interface IUseToastMessageParams {}

export interface IUseToastMessage {
    showAlert: (message: string, type: AlertType, duration?: number) => void;
}

export default function useAlert(/*params: IUseToastMessageParams*/): IUseToastMessage {
    // const {} = params;
    const [alertInfo, setAlertInfo] = useRecoilState(alertInfoState);

    const showAlert = useCallback(
        (message: string, type: AlertType, duration: number = 3000) => {
            setAlertInfo((prev: AlertInfoState) => {
                return {
                    lastSn: prev.lastSn + 1,
                    alerts: [...prev.alerts, { message, type, duration, isShow: true, id: prev.lastSn }],
                };
            });
        },
        [alertInfo],
    );

    return {
        showAlert,
    };
}

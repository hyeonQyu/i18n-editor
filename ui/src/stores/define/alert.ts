import { AlertProps } from '@components/common/alert/alert';

export interface AlertState extends Omit<AlertProps, 'index'> {}

export interface AlertInfoState {
    lastSn: number;
    alerts: AlertState[];
}

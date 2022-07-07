import { atom, selector } from 'recoil';
import { AlertInfoState, AlertState } from 'stores/define/alert';

export const alertsState = atom<AlertState[]>({
    key: 'alerts',
    default: [],
});

export const lastAlertSnState = atom<number>({
    key: 'alertSn',
    default: 0,
});

export const alertInfoState = selector<AlertInfoState>({
    key: 'alertInfo',
    set: ({ set }, newValue) => {
        const { lastSn, alerts } = newValue as AlertInfoState;
        set(alertsState, alerts);
        set(lastAlertSnState, lastSn);
    },
    get: ({ get }) => {
        return {
            lastSn: get(lastAlertSnState),
            alerts: get(alertsState),
        };
    },
});

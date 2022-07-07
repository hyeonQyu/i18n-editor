import { AlertProps } from '@components/common/alert/alert';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { alertsState } from 'stores/store';
import { AlertType } from '@components/common/alert/defines/alertDefines';
import useAnimationMount from '@hooks/common/useAnimationMount';

export interface IUseAlertInnerParams extends AlertProps {}

export interface IUseAlert {
    alertRef: MutableRefObject<HTMLDivElement | null>;
    width: number;
    height: number;
    left: number;
    bottom: number;
    iconPadding: number;
    backgroundColor: string;
}

const alertConfig = {
    width: 400,
    height: 60,
};

const backgroundColorMap: {
    [key in AlertType]: string;
} = {
    success: 'rgb(81,189,160)',
    info: 'rgb(101,165,239)',
    warning: 'rgb(220,172,68)',
    error: 'rgb(224,85,84)',
};

export default function useAlertInner(params: IUseAlertInnerParams): IUseAlert {
    const [alerts, setAlerts] = useRecoilState(alertsState);
    const disappearAnimationDuration = 0.4;

    const { width, height } = alertConfig;

    const getBottom = useCallback((index: number, height: number) => 160 + (alerts.length - index - 1) * (height + 14), [alerts]);
    const getLeft = useCallback((windowWidth: number) => (windowWidth - width) / 2, [width]);

    const { isShow, index, type, duration = 3000, id } = params;

    const alertRef = useRef<HTMLDivElement>(null);

    const [left, setLeft] = useState(getLeft(window.innerWidth));
    const [bottom, setBottom] = useState(getBottom(index, height));
    const { mounted } = useAnimationMount({ display: isShow, disappearAnimationDuration });

    useEffect(() => {
        setLeft(getLeft(window.innerWidth));
    }, [window.innerWidth, getLeft]);

    useEffect(() => {
        setBottom(getBottom(index, height));
    }, [height, index, alerts, getBottom]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            // 토스트 메시지 시간 만료
            setAlerts((prev) =>
                prev.map((alert) => {
                    return {
                        ...alert,
                        isShow: id === alert.id ? false : alert.isShow,
                    };
                }),
            );
        }, duration);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (!mounted) {
            setAlerts((prev) => prev.filter((alert) => alert.id !== id));
        }
    }, [mounted]);

    return {
        alertRef,
        width,
        height,
        left,
        bottom,
        iconPadding: 16,
        backgroundColor: backgroundColorMap[type as AlertType],
    };
}

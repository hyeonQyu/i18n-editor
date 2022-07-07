import { AlertType } from '@components/common/alert/defines/alertDefines';
import useAlertInner from '@components/common/alert/useAlertInner';
import { assetAlert } from '@public/assets/alert';
import classNames from 'classnames';
import { ZIndex } from '@defines/zIndex';

export interface AlertProps {
    isShow: boolean;
    message: string;
    type: AlertType;
    duration: number;
    id: number;
    index: number;
}

function Alert(props: AlertProps) {
    const { isShow, message, type } = props;
    const { alertRef, width, height, left, top, iconPadding, backgroundColor } = useAlertInner(props);

    return (
        <>
            <div className={classNames('alert', !isShow && 'close')} ref={alertRef}>
                <div className={'icon'} />
                <div className={'message'}>{message}</div>
            </div>

            <style jsx>{`
                @keyframes appear {
                    0% {
                        opacity: 0;
                    }
                }

                .alert {
                    position: absolute;
                    left: ${left}px;
                    display: flex;
                    align-items: center;
                    width: ${width}px;
                    height: ${height}px;
                    top: ${top}px;
                    transition: opacity 0.2s ease, top 0.2s ease;
                    animation: appear 0.4s ease;
                    background-color: ${backgroundColor};
                    border-radius: ${height}px;
                    z-index: ${ZIndex.ALERT};
                    padding: 0 10px;
                    box-shadow: 3px 3px 5px rgba(75, 75, 75, 0.4);
                }

                .alert.close {
                    opacity: 0;
                    top: ${top - 20}px;
                }

                .icon {
                    width: ${height}px;
                    height: ${height}px;
                    position: relative;
                    padding: ${iconPadding}px;
                }

                .icon:after {
                    content: '';
                    position: absolute;
                    background: url(${assetAlert[type]});
                    background-size: contain;
                    width: ${height - iconPadding * 2}px;
                    height: ${height - iconPadding * 2}px;
                }

                .message {
                    padding: 0 10px;
                    color: white;
                    font-size: 18px;
                    width: ${width - height}px;
                    line-height: 1.3;
                    word-break: keep-all;
                }
            `}</style>
        </>
    );
}

export default Alert;

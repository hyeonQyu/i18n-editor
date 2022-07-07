import Portal from '@components/common/portal/portal';
import { useRecoilValue } from 'recoil';
import Alert from '@components/common/alert/alert';
import { alertsState } from 'stores/store';

export interface AlertsWrapperProps {}

function AlertsWrapper(props: AlertsWrapperProps) {
    const {} = props;
    const alerts = useRecoilValue(alertsState);

    if (alerts.length === 0) {
        return <></>;
    }

    return (
        <>
            <Portal>
                {alerts.map((alert, index) => (
                    <Alert key={alert.id} {...alert} index={index} />
                ))}
            </Portal>

            <style jsx global>{``}</style>
        </>
    );
}

export default AlertsWrapper;

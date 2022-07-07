import Portal from '@components/common/portal/portal';
import AlertsWrapper from '@components/common/alert/alertsWrapper';

export interface GlobalPortalsProps {}

function GlobalPortals(props: GlobalPortalsProps) {
    const {} = props;

    return (
        <>
            <Portal>
                <AlertsWrapper />
            </Portal>

            <style jsx>{``}</style>
        </>
    );
}

export default GlobalPortals;

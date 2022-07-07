import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
    children?: ReactNode | ReactNode[];
}

function Portal(props: PortalProps) {
    const { children } = props;
    const [element, setElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setElement(document.getElementById('portal'));
    }, []);

    if (!element) {
        return <></>;
    }

    return ReactDOM.createPortal(children, element);
}

export default Portal;

import classNames from 'classnames';
import { ReactNode } from 'react';
import { IconCommonProps } from '@defines/iconCommonProps';
import { RotateDeg } from '@defines/css';

export interface IconProps extends Omit<IconCommonProps, 'color'> {
    children: ReactNode;
    rotateDeg?: RotateDeg;
}

function Icon(props: IconProps) {
    const { children, opacity = 1, rotateDeg = '0deg', onClick } = props;

    return (
        <>
            <div className={classNames('icon')} onClick={onClick}>
                {children}
            </div>

            <style jsx>{`
                .icon {
                    opacity: ${opacity};
                    transform: rotate(${rotateDeg});
                    font-size: 0;
                }
            `}</style>
        </>
    );
}

export default Icon;

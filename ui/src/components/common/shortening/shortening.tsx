import { HTMLAttributes } from 'react';

export interface ShorteningProps extends HTMLAttributes<any> {
    children: string;
    title?: string;
    lineHeight?: number;
}

function Shortening(props: ShorteningProps) {
    const { title, children, lineHeight, ...rest } = props;

    return (
        <>
            <p title={title ?? children} {...rest}>
                {children}
            </p>

            <style jsx>{`
                p {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin: 0;
                    ${lineHeight ? `line-height: ${lineHeight}` : ''}
                }
            `}</style>
        </>
    );
}

export default Shortening;

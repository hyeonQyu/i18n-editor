import { ReactNode } from 'react';

export interface TableRowProps {
    title?: string;
    children: ReactNode;
}

function TableRow(props: TableRowProps) {
    const { title, children } = props;

    return (
        <>
            <div className={'row'}>
                {title && <div className={'title'}>{title}</div>}
                <div className={'content'}>{children}</div>
            </div>

            <style jsx>{`
                .row {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: fit-content;
                    padding: 10px 0;
                }

                .title {
                    width: 30%;
                }

                .content {
                    width: ${title ? '70%' : '100%'};
                }
            `}</style>
        </>
    );
}

export default TableRow;

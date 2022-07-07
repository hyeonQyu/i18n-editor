import { ReactNode } from 'react';

export interface TableRowProps {
    title: string;
    children: ReactNode;
}

function TableRow(props: TableRowProps) {
    const { title, children } = props;

    return (
        <>
            <div className={'row'}>
                <div className={'title'}>{title}</div>
                <div className={'content'}>{children}</div>
            </div>

            <style jsx>{`
                .row {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 60px;
                }

                .title {
                    width: 30%;
                }

                .content {
                    width: 70%;
                }
            `}</style>
        </>
    );
}

export default TableRow;

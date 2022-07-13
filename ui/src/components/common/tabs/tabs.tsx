import { TabComponent } from '@components/common/tabs/defines/tabsDefines';
import React from 'react';
import useTabs from '@components/common/tabs/useTabs';
import classNames from 'classnames';
import useCss from '@hooks/common/useCss';

export interface TabProps {
    value: string;
    children: string;
}

export function Tab(props: TabProps) {
    return <></>;
}

export interface TabsProps {
    children: TabComponent | TabComponent[];
    value: string;
    onChange: (value: string) => void;
}

function Tabs(props: TabsProps) {
    const { childrenProps } = useTabs(props);
    const { getFontCss } = useCss({});

    return (
        <>
            <ul className={classNames('tabs')}>
                {childrenProps.map(({ label, selected, onClick, value }) => (
                    <li key={value} className={classNames(selected && 'selected')} onClick={onClick}>
                        {label}
                    </li>
                ))}
            </ul>

            <style jsx>{`
                .tabs {
                    display: flex;
                }

                .tabs > li {
                    width: 170px;
                    text-align: center;
                    padding: 14px 0;
                    border-bottom: 1px solid #d1d6db;
                    ${getFontCss(700, 20, 28, '#D1D6DB')};
                    cursor: pointer;
                }

                .tabs > li:hover {
                    color: #8b95a1;
                }

                .tabs > li:active {
                    color: #8b95a1;
                    background: #f5f7fa;
                }

                .tabs > li.selected {
                    border-bottom: 2px solid #1c7ed6;
                    color: #1c7ed6;
                    background: none;
                }
            `}</style>
        </>
    );
}

export default Tabs;

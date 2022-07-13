import { TabsProps } from '@components/common/tabs/tabs';
import React from 'react';
import { TabInnerProps } from '@components/common/tabs/defines/tabsDefines';

export interface IUseTabsParams extends TabsProps {}

export interface IUseTabs {
    childrenProps: TabInnerProps[];
}

export default function useTabs(params: IUseTabsParams): IUseTabs {
    const { children, value, onChange } = params;

    const childrenProps: TabInnerProps[] = React.Children.map(children, (child) => {
        const { value: childValue, children: label } = child.props;
        return {
            value: childValue,
            label,
            selected: value === childValue,
            onClick: () => onChange(childValue),
        };
    });

    return {
        childrenProps,
    };
}

import { ReactElement } from 'react';
import { TabProps } from '@components/common/tabs/tabs';

export type TabComponent = ReactElement<TabProps>;

export interface TabInnerProps {
    value: string;
    selected: boolean;
    label: string;
    onClick: () => void;
}

export type SelectValue = number | string;

export interface SelectBoxOption {
    value: SelectValue;
    label: string;
    disabled?: boolean;
}

export interface SelectBoxOption<T extends number | string> {
    value: T;
    name: string;
    disabled?: boolean;
}

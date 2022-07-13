import { IconCommonProps } from '@defines/iconCommonProps';
import Icon from '@components/common/icon/icon';

export interface CheckIconProps extends IconCommonProps {}

function CheckIcon(props: CheckIconProps) {
    const { color = '#444444', width = 24, height = 24 } = props;

    return (
        <Icon {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 24 24">
                <path
                    fill={color}
                    d="M10.875 13.125l-2-2.025a1.033 1.033 0 00-.788-.313 1.034 1.034 0 00-.762.338c-.217.2-.325.458-.325.775s.108.575.325.775l2.75 2.775c.217.217.483.325.8.325.317 0 .583-.108.8-.325l5.6-5.6c.2-.2.296-.454.288-.763A1.087 1.087 0 0016.45 8c-.317 0-.575.108-.775.325l-4.8 4.8z"
                />
            </svg>
        </Icon>
    );
}

export default CheckIcon;

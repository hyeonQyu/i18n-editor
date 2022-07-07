import { InputHTMLAttributes } from 'react';
import { Size } from '@defines/css';
import useCss from '@hooks/common/useCss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    width?: Size;
    changeValue?: (value: string) => void;
    onClear?: () => void;
}

function Input(props: InputProps) {
    const { width = '100%', changeValue, onClear, ...rest } = props;
    const { getSizeCss, getFontCss } = useCss({});

    return (
        <>
            <input {...rest} />

            <style jsx>{`
                input {
                    ${getSizeCss('width', width)};
                    height: 40px;
                    border-radius: 40px;
                    padding: 0 20px;
                    background-color: #e5ecef;
                    transition: 0.3s;
                    ${getFontCss(500, 16, 16, '#585858')};
                }

                input:focus {
                    background-color: #f3f7f8;
                    color: #444444;
                }

                input::placeholder {
                    color: #afafaf;
                }
            `}</style>
        </>
    );
}

export default Input;

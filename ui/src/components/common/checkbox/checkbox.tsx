import React, { InputHTMLAttributes, useId } from 'react';
import classNames from 'classnames';
import CheckIcon from '@icons/checkIcon';
import useCss from '@hooks/common/useCss';
import { Color } from '@defines/css';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

function Checkbox(props: CheckboxProps) {
    const id = useId();
    const { checked, onChange, disabled, value, children, defaultChecked, className, ...rest } = props;
    const { getFontCss } = useCss({});
    const color: { [key in string]: Color } = {
        blue: '#1C7ED6',
        silver: '#8B95A1',
        silver2: '#D1D6DB',
        silver3: '#E5E8EB',
        darkGray: '#333D4B',
    };

    return (
        <>
            <label className={classNames('wrapper', disabled && 'disabled', className)} htmlFor={id}>
                <input
                    id={id}
                    type={'checkbox'}
                    checked={checked}
                    disabled={disabled}
                    defaultChecked={defaultChecked}
                    onChange={onChange}
                    value={value}
                    {...rest}
                />
                <div className={classNames('icon-wrap')}>
                    <CheckIcon width={20} height={20} />
                </div>
                <div className={classNames('text')}>{children}</div>
            </label>

            <style jsx>{`
                input {
                    position: absolute;
                    clip: rect(0 0 0 0);
                    clip-path: inset(50%);
                    height: 1px;
                    overflow: hidden;
                    white-space: nowrap;
                    width: 1px;
                }
                .wrapper {
                    ${getFontCss(500, 14, 24)}
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }
                .wrapper:active .icon-wrap:after {
                    position: absolute;
                    content: '';
                    width: 32px;
                    height: 32px;
                    border-radius: 4px;
                    display: flex;
                    top: -8px;
                    left: -8px;
                    background-color: ${color.blue};
                }
                .icon-wrap {
                    border-radius: 4px;
                    width: 20px;
                    height: 20px;
                    min-width: 20px;
                    position: relative;
                    pointer-events: none;
                    border: 2px solid ${color.silver2};
                }
                .icon-wrap :global(svg) {
                    border-radius: 4px;
                    position: absolute;
                    top: -2px;
                    left: -2px;
                }
                .icon-wrap :global(path) {
                    fill: white;
                }

                input[type='checkbox']:checked + .icon-wrap :global(svg) {
                    background-color: ${color.blue};
                }
                .wrapper:hover > .icon-wrap {
                    border-color: ${color.blue};
                }

                .wrapper:active :global(svg) {
                    background-color: ${color.blue};
                }

                .disabled {
                    pointer-events: none;
                    opacity: 0.3;
                }
                .disabled input[type='checkbox']:not(:checked) + .icon-wrap :global(svg) {
                    display: none;
                }
                .disabled input[type='checkbox']:not(:checked) + .icon-wrap {
                    background-color: ${color.silver3};
                }

                .text {
                    margin-left: 8px;
                    ${getFontCss(400, 16, 24, color.silver)};
                    word-break: keep-all;
                }

                input:checked ~ .text {
                    color: ${color.darkGray};
                }
            `}</style>
        </>
    );
}

export default Checkbox;

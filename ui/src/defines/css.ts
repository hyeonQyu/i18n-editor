/*
 * CSS 관련 타입
 */
export type VerticalPositionProperty = 'top' | 'bottom';

export type HorizontalPositionProperty = 'left' | 'right';

type PositionProperty = VerticalPositionProperty | HorizontalPositionProperty;

type SpaceProperty = 'padding' | 'margin';

export type SizeProperty =
    | 'width'
    | 'height'
    | PositionProperty
    | `${SpaceProperty}-${PositionProperty}`
    | 'border-radius'
    | 'line-height'
    | 'font-size';

export type Size = number | `${number}px` | `${number}%` | `${number}rem` | `${number}em` | 'fit-content';

export type SizeCss = `${SizeProperty}: ${Exclude<Size, number>};` | '';

export type RotateDeg = `${number}deg`;

export type Color = `#${string}`;

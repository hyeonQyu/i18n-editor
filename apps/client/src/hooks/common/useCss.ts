import { useCallback } from 'react';
import { Color, Size, SizeCss, SizeProperty } from '@defines/css';

export interface IUseCssParams {}

export interface IUseCss {
  getSizeCss: (property: SizeProperty, size?: Size) => SizeCss;
  getFontCss: (fontWeight: number, fontSize: Size, lineHeight: Size, color?: Color) => string;
}

export default function useCss(params: IUseCssParams): IUseCss {
  const {} = params;

  const getSizeCss = useCallback((property: SizeProperty, size?: Size): SizeCss => {
    if (size === undefined) {
      return '';
    }

    if (typeof size === 'number') {
      return `${property}: ${size}px;`;
    }

    return `${property}: ${size};`;
  }, []);

  const getFontCss = (fontWeight: number, fontSize: Size, lineHeight: Size, color: Color = '#353535') => {
    return `
            font-style: normal;
            font-weight: ${fontWeight};
            ${getSizeCss('font-size', fontSize)}; 
            ${getSizeCss('line-height', lineHeight)};
            letter-spacing: -0.03em;
            color: ${color};
        `;
  };

  return {
    getSizeCss,
    getFontCss,
  };
}

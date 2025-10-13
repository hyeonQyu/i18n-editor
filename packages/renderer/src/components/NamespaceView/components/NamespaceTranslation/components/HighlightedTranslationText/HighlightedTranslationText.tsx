import EllipsisText, { EllipsisTextProps } from '@/components/EllipsisText';
import { HighlightedText } from '@/components/HighlightedText';
import { useCallback, useEffect, useRef } from 'react';

interface HighlightedTranslationTextProps extends Pick<EllipsisTextProps, 'variant' | 'sx' | 'hideTooltip'> {
  text: string;
  keyword: string;
}

function HighlightedTranslationText({ text, keyword, ...ellipsisTextProps }: HighlightedTranslationTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const highlightedTextRef = useRef<HTMLSpanElement>(null);
  const lastScrollLeftRef = useRef<number>(0);

  const scrollToHighlighted = useCallback(() => {
    if (!highlightedTextRef.current || !containerRef.current) {
      return;
    }

    const highlightedElement = highlightedTextRef.current.querySelector('mark');
    const container = containerRef.current;

    if (highlightedElement) {
      const containerRect = container.getBoundingClientRect();
      const highlightedRect = highlightedElement.getBoundingClientRect();

      const scrollLeft = highlightedRect.left - containerRect.left - containerRect.width / 2 + highlightedRect.width / 2;
      const newScrollLeft = Math.max(0, scrollLeft);

      if (Math.abs(newScrollLeft - lastScrollLeftRef.current) > 1) {
        container.scrollLeft = newScrollLeft;
        lastScrollLeftRef.current = newScrollLeft;
      }
    }
  }, [text]);

  useEffect(() => {
    if (!keyword) {
      return;
    }

    const timeoutId = setTimeout(() => {
      scrollToHighlighted();
    });

    return () => clearTimeout(timeoutId);
  }, [keyword, scrollToHighlighted]);

  return (
    <EllipsisText ref={containerRef} {...ellipsisTextProps} sx={{ ...ellipsisTextProps.sx, textOverflow: 'unset' }} label={text}>
      <HighlightedText ref={highlightedTextRef} text={text} keyword={keyword} />
    </EllipsisText>
  );
}

export default HighlightedTranslationText;

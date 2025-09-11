import { forwardRef } from 'react';

interface HighlightedTextProps {
  text: string;
  keyword: string;
}

const HighlightedText = forwardRef<HTMLSpanElement, HighlightedTextProps>(function HighlightedText({ text, keyword }, ref) {
  if (!keyword) {
    return <span ref={ref}>{text}</span>;
  }

  const parts = text.split(new RegExp(`(${keyword})`, 'gi'));

  return (
    <span ref={ref}>
      {parts.map((part, index) =>
        part.toLowerCase() === keyword.toLowerCase() ? <mark key={index}>{part}</mark> : <span key={index}>{part}</span>,
      )}
    </span>
  );
});

export default HighlightedText;

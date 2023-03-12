import { HTMLAttributes, ReactNode } from 'react';

export interface ShorteningProps extends HTMLAttributes<any> {
  children: string | ReactNode | ReactNode[];
  title?: string;
  lineLimit?: number;
}

export function Shortening(props: ShorteningProps) {
  const { title, children, lineLimit = 1, ...rest } = props;

  return (
    <>
      <p title={title ?? (typeof children === 'string' ? children : '')} className={lineLimit === 1 ? 'single' : 'multi'} {...rest}>
        {children}
      </p>

      <style jsx>{`
        p.single {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        p.multi {
          display: -webkit-box;
          word-wrap: break-word;
          -webkit-line-clamp: ${lineLimit};
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

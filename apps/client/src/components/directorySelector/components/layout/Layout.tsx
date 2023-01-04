import { PropsWithChildren } from 'react';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.css';
import { ZIndex } from '@defines/zIndex';

export interface LayoutProps extends PropsWithChildren {}

export function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <>
      <header>
        <Button label={'저장'} className={'p-button'} tooltip={'Ctrl + S'} tooltipOptions={{ position: 'bottom' }} />
      </header>
      <main>{children}</main>

      <style jsx>{`
        header {
          position: sticky;
          top: 0;
          z-index: ${ZIndex.HEADER};
          background: white;
          height: 80px;
          box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
          display: flex;
          align-items: center;
          justify-content: end;
          padding: 0 80px;
        }
      `}</style>
    </>
  );
}

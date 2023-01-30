import { Skeleton } from 'primereact/skeleton';

export interface HomeSkeletonProps {}

export function HomeSkeleton(props: HomeSkeletonProps) {
  const {} = props;

  return (
    <>
      <div className={'skeleton-container'}>
        <div className={'item'}>
          <Skeleton className={'mb-2'} width={'40%'} height={'16px'} />
          <Skeleton className={'mb-2'} width={'100%'} height={'40px'} />
        </div>

        <div className={'item'}>
          <Skeleton className={'mb-2'} width={'40%'} height={'16px'} />
          <Skeleton className={'mb-2'} width={'100%'} height={'40px'} />
        </div>
      </div>

      <style jsx>{`
        .skeleton-container {
          width: 600px;
          margin: 0 auto;
          padding: 60px 0;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
      `}</style>
    </>
  );
}

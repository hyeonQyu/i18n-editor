import { DirectorySelector } from '@components/directorySelector';

export interface IndexProps {}

function Index(props: IndexProps) {
  const {} = props;

  return (
    <>
      <div>
        <DirectorySelector />
      </div>

      <style jsx>{``}</style>
    </>
  );
}

export default Index;

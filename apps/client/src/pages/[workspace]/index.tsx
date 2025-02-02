import WorkspaceView from '@components/WorkspaceView';
import useWorkspace from '@hooks/workspace/useWorkspace';
import Head from 'next/head';

function WorkspacePage() {
  const workspace = useWorkspace();

  return (
    <>
      <Head>
        <title>{workspace?.name}</title>
      </Head>
      <WorkspaceView />
    </>
  );
}

export default WorkspacePage;

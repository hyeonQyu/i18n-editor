import NamespaceView from '@components/NamespaceView';
import useNamespace from '@hooks/namespace/useNamespace';
import useWorkspace from '@hooks/workspace/useWorkspace';
import Head from 'next/head';

function NamespacePage() {
  const workspace = useWorkspace();
  const namespace = useNamespace();

  return (
    <>
      <Head>
        <title>
          {workspace?.name} / {namespace}
        </title>
      </Head>

      <NamespaceView />
    </>
  );
  return <NamespaceView />;
}

export default NamespacePage;

import { HomeView } from '@/components/HomeView';
import Layout from '@/components/Layout';
import NamespaceView from '@/components/NamespaceView';
import { WorkspaceView } from '@/components/WorkspaceView';
import { Route, Routes } from 'react-router-dom';

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomeView />
          </Layout>
        }
      />
      <Route
        path="/:workspaceId"
        element={
          <Layout>
            <WorkspaceView />
          </Layout>
        }
      />
      <Route
        path="/:workspaceId/:namespace"
        element={
          <Layout>
            <NamespaceView />
          </Layout>
        }
      />
    </Routes>
  );
}

export default AppRouter;

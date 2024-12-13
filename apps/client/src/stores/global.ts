import { create } from 'zustand/react';

interface Workspace {
  name: string;
  path: string;
}

interface GlobalStore {
  workspaces: Map<string, Workspace>;
  selectWorkspace: (path: string) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => {
  return {
    workspaces: new Map<string, Workspace>(),

    selectWorkspace: (path) => {
      set(({ workspaces }) => {
        const newWorkspaces = new Map(workspaces);

        if (newWorkspaces.has(path)) {
          const workspace = newWorkspaces.get(path);

          newWorkspaces.delete(path);

          if (workspace) {
            newWorkspaces.set(path, workspace);
          }
        } else {
          newWorkspaces.set(path, { name: path, path });
        }

        return { workspaces: newWorkspaces };
      });
    },
  };
});

export const MUTATION_KEY = {
  fileSystem: {
    base: ['fileSystem'] as const,
    postFileManager: () => [...MUTATION_KEY.fileSystem.base, 'postFileManager'] as const,
  },

  workspace: {
    base: ['workspace'] as const,
    postWorkspace: () => [...MUTATION_KEY.workspace.base, 'postWorkspace'] as const,
    deleteWorkspace: () => [...MUTATION_KEY.workspace.base, 'deleteWorkspace'] as const,
    postNamespace: () => [...MUTATION_KEY.workspace.base, 'postNamespace'] as const,
  },
};

export const MUTATION_KEY = {
  fileSystem: {
    base: ['fileSystem'] as const,
    postFileManager: () => [...MUTATION_KEY.fileSystem.base, 'postFileManager'] as const,
  },

  workspace: {
    base: ['workspace'] as const,
    postWorkspace: () => [...MUTATION_KEY.workspace.base, 'postWorkspace'] as const,
    deleteWorkspace: () => [...MUTATION_KEY.workspace.base, 'deleteWorkspace'] as const,
    postLanguageCodes: () => [...MUTATION_KEY.workspace.base, 'postLanguageCodes'] as const,
    postNamespace: () => [...MUTATION_KEY.workspace.base, 'postNamespace'] as const,
    postTranslation: () => [...MUTATION_KEY.workspace.base, 'postTranslation'] as const,
    putTranslation: () => [...MUTATION_KEY.workspace.base, 'putTranslation'] as const,
    deleteTranslation: () => [...MUTATION_KEY.workspace.base, 'deleteTranslation'] as const,
  },
};

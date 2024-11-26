export const MUTATION_KEY = {
  fileSystem: {
    base: ['fileSystem'] as const,
    postFileManager: () => [...MUTATION_KEY.fileSystem.base, 'postFileManager'] as const,
  },

  namespace: {
    base: ['namespace'] as const,
    postNamespace: () => [...MUTATION_KEY.namespace.base, 'postNamespace'] as const,
  },
};

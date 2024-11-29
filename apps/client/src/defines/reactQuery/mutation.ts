export const MUTATION_KEY = {
  fileSystem: {
    base: ['fileSystem'] as const,
    postFileManager: () => [...MUTATION_KEY.fileSystem.base, 'postFileManager'] as const,
  },
};

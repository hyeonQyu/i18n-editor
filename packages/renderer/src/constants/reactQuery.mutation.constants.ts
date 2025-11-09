export const MUTATION_KEY = {
  config: {
    base: () => ['config'] as const,
    ui: {
      base: () => [...MUTATION_KEY.config.base(), 'ui'] as const,
      update: () => [...MUTATION_KEY.config.ui.base(), 'update'] as const,
    },
    editor: {
      base: () => [...MUTATION_KEY.config.base(), 'editor'] as const,
      update: () => [...MUTATION_KEY.config.editor.base(), 'update'] as const,
    },
  },
};

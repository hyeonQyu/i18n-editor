export const QUERY_KEY = {
  config: {
    base: () => ['config'] as const,
    ui: {
      base: () => [...QUERY_KEY.config.base(), 'ui'] as const,
      read: () => [...QUERY_KEY.config.ui.base(), 'read'] as const,
    },
  },
};

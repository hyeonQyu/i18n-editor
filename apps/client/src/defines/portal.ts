export type PortalActionHandler<TBaseStore extends { open: Function; close: Function }> = (state: TBaseStore) => Partial<TBaseStore>;

export const getDefaultActionHandler =
  <TBaseStore extends { open: Function; close: Function }>(): PortalActionHandler<TBaseStore> =>
  () => ({});

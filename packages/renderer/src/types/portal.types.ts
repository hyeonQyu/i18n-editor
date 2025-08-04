export type PortalActionHandler<TBaseStore extends { open: Function; close: Function }> = (state: TBaseStore) => Partial<TBaseStore>;

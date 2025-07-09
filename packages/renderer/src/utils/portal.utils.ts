import { PortalActionHandler } from '../types/portal.types';

export const getDefaultActionHandler =
  <TBaseStore extends { open: Function; close: Function }>(): PortalActionHandler<TBaseStore> =>
  () => ({});

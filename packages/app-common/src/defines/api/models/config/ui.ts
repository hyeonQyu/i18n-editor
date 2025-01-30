import { Config } from '../../../config';

export type GetUIResponse = {
  ui: Config['ui'];
};

export type PatchUIRequest = {
  ui: Partial<Config['ui']>;
};

export type PatchUIResponse = void;

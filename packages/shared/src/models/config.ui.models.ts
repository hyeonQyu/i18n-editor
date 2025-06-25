import { Config } from '../defines';

export type UIReadResponse = Config['ui'];

export type UIUpdateRequest = Partial<Config['ui']>;

export type UIUpdateResponse = void;

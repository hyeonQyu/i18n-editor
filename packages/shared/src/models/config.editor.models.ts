import { Config } from '../defines';

export type EditorReadResponse = Config['editor'];

export type EditorUpdateRequest = Partial<Config['editor']>;

export type EditorUpdateResponse = void;

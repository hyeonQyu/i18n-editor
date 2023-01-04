import { DirectoryEntry } from './types';

export interface CommonRes<T = object> {
  status: number;
  errorMessage?: string;
  data?: T;
}

export interface DirectoryReq {
  path?: string;
}

export interface DirectoryRes {
  path: string;
  entries: DirectoryEntry[];
}

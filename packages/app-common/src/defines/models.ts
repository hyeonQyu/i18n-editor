export interface CommonRes<T = object> {
  status: number;
  errorMessage?: string;
  data?: T;
}

export interface DirectoryReq {
  path?: string;
}

export interface DirectoryRes extends CommonRes<DirectoryDto> {}

export interface DirectoryDto {
  path: string;
  entries: string[];
}

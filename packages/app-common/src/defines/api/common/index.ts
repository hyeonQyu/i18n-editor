import { HttpStatusCode } from 'axios';

export type ResponseEntity<T> =
  | {
      status: HttpStatusCode.Ok;
      errorMessage?: never | undefined;
      data: T;
    }
  | ErrorResponseEntity;

export type ErrorResponseEntity = {
  status: Exclude<HttpStatusCode, HttpStatusCode.Ok>;
  errorMessage: string;
  data?: never;
};

import { HttpStatusCode } from 'axios';

export type ResponseEntity<T> =
  | {
      status: HttpStatusCode.Ok;
      errorMessage?: never | undefined;
      data: T;
    }
  | {
      status: Exclude<HttpStatusCode, HttpStatusCode.Ok>;
      errorMessage: string;
      data?: never;
    };

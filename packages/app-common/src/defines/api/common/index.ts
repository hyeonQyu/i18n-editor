import { StatusCodes } from 'http-status-codes';

export type ResponseEntity<T> =
  | {
      status: StatusCodes.OK;
      errorMessage?: never | undefined;
      data: T;
    }
  | ErrorResponseEntity;

export type ErrorResponseEntity = {
  status: Exclude<StatusCodes, StatusCodes.OK>;
  errorMessage: string;
  data?: never;
};

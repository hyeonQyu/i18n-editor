import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { ErrorResponseEntity } from 'i18n-editor-common';

const DEFAULT_ERROR: ErrorResponseEntity = {
  status: StatusCodes.INTERNAL_SERVER_ERROR,
  errorMessage: 'An error occurred',
};

type ErrorHandler = (e: ErrorResponseEntity) => void;

function useCreateAxiosErrorHandler() {
  return (handler: Partial<Record<StatusCodes, ErrorHandler>> | ErrorHandler) => (e: any) => {
    if (!(e instanceof AxiosError)) return;

    const error: ErrorResponseEntity = (e.response?.data as ErrorResponseEntity) ?? DEFAULT_ERROR;

    return typeof handler === 'function' ? handler(error) : handler[error.status as StatusCodes]?.(error);
  };
}

export default useCreateAxiosErrorHandler;

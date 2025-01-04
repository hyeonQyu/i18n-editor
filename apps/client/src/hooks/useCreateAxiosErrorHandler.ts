import { AxiosError, HttpStatusCode } from 'axios';
import { ErrorResponseEntity } from 'i18n-editor-common';

const DEFAULT_ERROR: ErrorResponseEntity = {
  status: HttpStatusCode.InternalServerError,
  errorMessage: 'An error occurred',
};

type ErrorHandler = (e: ErrorResponseEntity) => void;

function useCreateAxiosErrorHandler() {
  return (handler: Partial<Record<HttpStatusCode, ErrorHandler>> | ErrorHandler) => (e: any) => {
    if (!(e instanceof AxiosError)) return;

    const error: ErrorResponseEntity = (e.response?.data as ErrorResponseEntity) ?? DEFAULT_ERROR;

    return typeof handler === 'function' ? handler(error) : handler[error.status as HttpStatusCode]?.(error);
  };
}

export default useCreateAxiosErrorHandler;

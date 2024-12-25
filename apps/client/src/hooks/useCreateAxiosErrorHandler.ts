import { AxiosError, HttpStatusCode } from 'axios';
import { ErrorResponseEntity } from 'i18n-editor-common';

const DEFAULT_ERROR: ErrorResponseEntity = {
  status: HttpStatusCode.InternalServerError,
  errorMessage: 'An error occurred',
};

function useCreateAxiosErrorHandler() {
  return (handler: Partial<Record<HttpStatusCode, (e: ErrorResponseEntity) => void>>) => (e: any) => {
    if (!(e instanceof AxiosError)) return;

    const error: ErrorResponseEntity = (e.response?.data as ErrorResponseEntity) ?? DEFAULT_ERROR;
    return handler[error.status as HttpStatusCode]?.(error);
  };
}

export default useCreateAxiosErrorHandler;

import { AxiosInterceptorOptions, AxiosResponse } from 'axios';

/**
 * @deprecated
 */
export interface AxiosInstanceProps {
  port: number;
  responseInterceptor?: {
    onFulfilled?: (response: AxiosResponse) => AxiosResponse;
    onRejected?: (error: any) => any;
    options?: AxiosInterceptorOptions;
  };
}

import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ResponseEntity } from 'i18n-editor-common';

export type AxiosRequestFunction<Req, Res> = (req: Req, config?: AxiosRequestConfig) => Promise<AxiosResponse<ResponseEntity<Res>>>;

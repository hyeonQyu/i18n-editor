import { ParamsDictionary, Request, Response } from 'express-serve-static-core';
import { ResponseEntity } from 'i18n-editor-common';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

export type RequestHandler<ReqBody, ReqQuery, Res> = (
  req: Request<ParamsDictionary, any, ReqBody, ReqQuery>,
) => Promise<ResponseEntity<Res>>;

export interface ControllerMethod<ReqBody, ReqQuery, Res> {
  path: string;
  method: HttpMethod;
  handler: RequestHandler<ReqBody, ReqQuery, Res>;
}

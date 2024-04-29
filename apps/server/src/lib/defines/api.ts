import { ParamsDictionary, Request } from 'express-serve-static-core';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

export type RequestHandler<ReqBody, ReqQuery, Res> = (req: Request<ParamsDictionary, any, ReqBody, ReqQuery>) => Promise<Res>;

export interface ControllerMethod<ReqBody, ReqQuery, Res> {
  path: string;
  method: HttpMethod;
  handler: RequestHandler<ReqBody, ReqQuery, Res>;
}

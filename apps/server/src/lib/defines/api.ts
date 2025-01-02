import { Request } from 'express-serve-static-core';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

export type RequestHandler<ReqBody, ReqParams, ReqQuery, Res> = (req: Request<ReqParams, any, ReqBody, ReqQuery>) => Promise<Res>;

export interface ControllerMethod<ReqBody, ReqParams, ReqQuery, Res> {
  path: string;
  method: HttpMethod;
  handler: RequestHandler<ReqBody, ReqParams, ReqQuery, Res>;
}

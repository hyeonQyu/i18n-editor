import { ParsedQs } from 'qs';
import { CommonRes } from 'app-common';
import { ParamsDictionary, Request, Response } from 'express-serve-static-core';

export namespace Controller {
  export function response(app: any) {}

  function doCommonResponse<ReqBody, ReqQs extends ParsedQs, Res extends CommonRes | void>(
    app: any,
    path: string,
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    callback: (req: Request<ParamsDictionary, any, ReqBody, ReqQs>, res: Response<Omit<Res, 'status'>>) => void,
  ) {
    app[method](`/api/${path}`, async (req: Request<ParamsDictionary, any, ReqBody, ReqQs>, res: Response<Omit<Res, 'status'>>) => {
      console.log(`\nrequest: /${path}`);
      await callback(req, res);
    });
  }
}

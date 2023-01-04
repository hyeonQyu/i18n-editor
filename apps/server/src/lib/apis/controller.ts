import { ParsedQs } from 'qs';
import { DirectoryReq, DirectoryRes } from 'i18n-editor-common';
import { ParamsDictionary, Request, Response } from 'express-serve-static-core';
import { Service } from './service';

export namespace Controller {
  export function response(app: any) {
    doCommonResponse<DirectoryReq, any, DirectoryRes>(app, '/directory', 'get', (req, res) => {
      const { status, data } = Service.getDirectory(req.query);
      res.status(status).send(data);
    });
  }

  function doCommonResponse<ReqBody, ReqQs extends ParsedQs, Res = void>(
    app: any,
    path: string,
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    callback: (req: Request<ParamsDictionary, any, ReqBody, ReqQs>, res: Response<Res>) => void,
  ) {
    app[method](`/api${path}`, async (req: Request<ParamsDictionary, any, ReqBody, ReqQs>, res: Response<Res>) => {
      console.log(`\nrequest: ${path}`);
      await callback(req, res);
    });
  }
}

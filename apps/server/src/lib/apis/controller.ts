import { ParsedQs } from 'qs';
import { CommonRes, DirectoryReq, DirectoryRes } from 'i18n-editor-common';
import { ParamsDictionary, Request, Response } from 'express-serve-static-core';
import { Service } from './service';

export namespace Controller {
  export function response(app: any) {
    doCommonResponse<DirectoryReq, any, DirectoryRes>(app, '/directory', 'get', (req, res) => {
      const response = Service.getDirectory(req.query);
      res.status(response.status).send(response);
    });
  }

  function doCommonResponse<ReqBody, ReqQs extends ParsedQs, Res extends CommonRes | void>(
    app: any,
    path: string,
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    callback: (req: Request<ParamsDictionary, any, ReqBody, ReqQs>, res: Response<Omit<Res, 'status'>>) => void,
  ) {
    app[method](`/api${path}`, async (req: Request<ParamsDictionary, any, ReqBody, ReqQs>, res: Response<Omit<Res, 'status'>>) => {
      console.log(`\nrequest: ${path}`);
      await callback(req, res);
    });
  }
}

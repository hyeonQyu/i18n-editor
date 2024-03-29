import {
  CommonRes,
  GetDirectoryReq,
  GetDirectoryRes,
  GetContentReq,
  GetContentRes,
  GetTranslationFileReq,
  GetTranslationFileRes,
  PatchContentReq,
  PatchContentRes,
  PostContentRowReq,
  PostContentRowRes,
  DeleteContentRowReq,
  DeleteContentRowRes,
  PostContentColumnReq,
  PostContentColumnRes,
  DeleteContentColumnReq,
  DeleteContentColumnRes,
  GetFileExplorerReq,
  GetFileExplorerRes,
  PostDirectoryReq,
  PostDirectoryRes,
  PostTranslationFileReq,
  PostTranslationFileRes,
  GetConfigRes,
} from 'i18n-editor-common';
import { ParamsDictionary, Request, Response } from 'express-serve-static-core';
import { Service } from './service';

export namespace Controller {
  export function response(app: any) {
    doCommonResponse<void, void, GetConfigRes>(app, '/config', 'get', (req, res) => {
      const response = Service.getConfig();
      res.status(response.status).send(response);
    });

    doCommonResponse<void, GetDirectoryReq, GetDirectoryRes>(app, '/directory', 'get', (req, res) => {
      const response = Service.getDirectory(req.query);
      res.status(response.status).send(response);
    });

    doCommonResponse<PostDirectoryReq, void, PostDirectoryRes>(app, '/directory', 'post', (req, res) => {
      const response = Service.postDirectory(req.body);
      res.status(response.status).send(response);
    });

    doCommonResponse<void, GetFileExplorerReq, GetFileExplorerRes>(app, '/file-explorer', 'get', (req, res) => {
      const response = Service.getFileExplorer(req.query);
      res.status(response.status).send(response);
    });

    doCommonResponse<void, GetTranslationFileReq, GetTranslationFileRes>(app, '/translation-file', 'get', (req, res) => {
      const response = Service.getTranslationFiles(req.query);
      res.status(response.status).send(response);
    });

    doCommonResponse<PostTranslationFileReq, void, PostTranslationFileRes>(app, '/translation-file', 'post', (req, res) => {
      const response = Service.postTranslationFile(req.body);
      res.status(response.status).send(response);
    });

    doCommonResponse<void, GetContentReq, GetContentRes>(app, '/content', 'get', (req, res) => {
      const response = Service.getContent(req.query);
      res.status(response.status).send(response);
    });

    doCommonResponse<PatchContentReq, void, PatchContentRes>(app, '/content', 'patch', (req, res) => {
      const response = Service.patchContent(req.body);
      res.status(response.status).send(response);
    });

    doCommonResponse<PostContentRowReq, void, PostContentRowRes>(app, '/content/row', 'post', (req, res) => {
      const response = Service.postContentRow(req.body);
      res.status(response.status).send(response);
    });

    doCommonResponse<DeleteContentRowReq, void, DeleteContentRowRes>(app, '/content/row', 'delete', (req, res) => {
      const response = Service.deleteContentRow(req.body);
      res.status(response.status).send(response);
    });

    doCommonResponse<PostContentColumnReq, void, PostContentColumnRes>(app, '/content/column', 'post', (req, res) => {
      const response = Service.postContentColumn(req.body);
      res.status(response.status).send(response);
    });

    doCommonResponse<DeleteContentColumnReq, void, DeleteContentColumnRes>(app, '/content/column', 'delete', (req, res) => {
      const response = Service.deleteContentColumn(req.body);
      res.status(response.status).send(response);
    });
  }

  function doCommonResponse<ReqBody, ReqQs, Res extends CommonRes<any>>(
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

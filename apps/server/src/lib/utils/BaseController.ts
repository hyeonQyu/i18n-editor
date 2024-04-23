import { Express } from 'express';
import { getLeadingSlash, ResponseEntity } from 'i18n-editor-common';
import { ParamsDictionary, Request, Response } from 'express-serve-static-core';
import { ControllerMethod, RequestHandler } from '../defines/api';

abstract class BaseController {
  private readonly _baseUrl: string;

  private readonly _app: Express;

  public constructor(baseUrl: string, app: Express) {
    this._baseUrl = baseUrl;
    this._app = app;

    Object.keys(this).forEach((key) => {
      Object.defineProperty(this, key, {
        writable: false,
        enumerable: false,
        configurable: false,
      });
    });
  }

  public start() {
    Object.entries(this).forEach(([key, value]) => {
      if (BaseController.getIsControllerMethod(value)) {
        this.processRequest(value.path, value.method, value.handler);
      }
    });
  }

  private processRequest = <ReqBody, ReqQuery, Res>(
    path: string,
    method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head',
    onRequest: RequestHandler<ReqBody, ReqQuery, Res>,
  ) => {
    const url = `/api${getLeadingSlash(this._baseUrl)}${getLeadingSlash(path)}`;

    this._app[method](url, async (req: Request<ParamsDictionary, any, ReqBody, ReqQuery>, res: Response<ResponseEntity<Res>>) => {
      console.log(`\nrequest: ${url}`);

      const response = await onRequest(req);
      res.status(response.status).send(response);
    });
  };

  private static getIsControllerMethod = (value: unknown): value is ControllerMethod<unknown, unknown, unknown> => {
    return (
      typeof value === 'object' &&
      value !== null &&
      'path' in value &&
      typeof value.path === 'string' &&
      'method' in value &&
      typeof value.method === 'string' &&
      'handler' in value &&
      typeof value.handler === 'function'
    );
  };
}

export default BaseController;

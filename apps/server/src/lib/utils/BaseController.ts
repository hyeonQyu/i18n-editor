import { HttpStatusCode } from 'axios';
import { Express } from 'express';
import { ParamsDictionary, Request, Response } from 'express-serve-static-core';
import { getLeadingSlash, ResponseEntity } from 'i18n-editor-common';
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
    Object.values(this).forEach((prop) => {
      if (BaseController.getIsControllerMethod(prop)) {
        this.processRequest(prop.path, prop.method, prop.handler);
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

      try {
        const response = await onRequest(req);

        BaseController.sendResponse(res, HttpStatusCode.Ok, {
          data: response,
        });
      } catch (e) {
        // TODO 공통 예외 처리 (IE-54)
        BaseController.sendResponse(res, HttpStatusCode.InternalServerError, {
          errorMessage: (e as Error).message,
        });
      }
    });
  };

  private static sendResponse = <Res>(
    res: Response<ResponseEntity<Res>>,
    status: HttpStatusCode,
    data: Omit<ResponseEntity<Res>, 'status'>,
  ) => {
    res.status(status).send({
      // @ts-ignore
      status,
      ...data,
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

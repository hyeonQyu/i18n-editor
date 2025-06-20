import { Express } from 'express';
import { Request, Response } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { getLeadingSlash, ResponseEntity } from 'i18n-editor-common';
import { ControllerMethod, RequestHandler } from '../defines/api';
import { BadRequestError, ConflictError, NotFoundError } from '../defines/errors';

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

  private processRequest = <ReqBody, ReqParams, ReqQuery, Res>(
    path: string,
    method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head',
    onRequest: RequestHandler<ReqBody, ReqParams, ReqQuery, Res>,
  ) => {
    const url = `/api${getLeadingSlash(this._baseUrl)}${getLeadingSlash(path)}`;

    this._app[method](url, async (req: Request<ReqParams, any, ReqBody, ReqQuery>, res: Response<ResponseEntity<Res>>) => {
      console.log(`\nrequest: ${url}`);

      try {
        const response = await onRequest(req);

        BaseController.sendResponse(res, StatusCodes.OK, {
          data: response,
        });
      } catch (e) {
        const getStatusCode = () => {
          if (e instanceof NotFoundError) return StatusCodes.NOT_FOUND;
          if (e instanceof BadRequestError) return StatusCodes.BAD_REQUEST;
          if (e instanceof ConflictError) return StatusCodes.CONFLICT;
          return StatusCodes.INTERNAL_SERVER_ERROR;
        };

        BaseController.sendResponse(res, getStatusCode(), {
          errorMessage: (e as Error).message,
        });
      }
    });
  };

  private static sendResponse = <Res>(
    res: Response<ResponseEntity<Res>>,
    status: StatusCodes,
    data: Omit<ResponseEntity<Res>, 'status'>,
  ) => {
    res.status(status).send({
      status,
      ...data,
    } as ResponseEntity<Res>);
  };

  private static getIsControllerMethod = (value: unknown): value is ControllerMethod<unknown, unknown, unknown, unknown> => {
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

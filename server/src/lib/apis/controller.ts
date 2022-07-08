import { CommonRes, SaveReq } from '../defines/models';
import { ParamsDictionary, Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { Service } from './service';

export namespace Controller {
    export async function response(app: any) {
        /**
         * 저장
         */
        doCommonResponse<SaveReq, any, void>(app, 'save', 'post', async (req, res) => {
            const status = await Service.postSave(req.body);
            res.status(status).send();
        });
    }

    function doCommonResponse<ReqBody, ReqQs extends ParsedQs, Res extends CommonRes | void>(
        app: any,
        path: string,
        method: 'get' | 'post',
        callback: (req: Request<ParamsDictionary, any, ReqBody, ReqQs>, res: Response<Omit<Res, 'status'>>) => void,
    ) {
        app[method](`/api/${path}`, async (req: Request<ParamsDictionary, any, ReqBody, ReqQs>, res: Response<Omit<Res, 'status'>>) => {
            console.log(`\nrequest: /${path}`);
            await callback(req, res);
        });
    }
}

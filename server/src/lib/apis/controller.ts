import { CommonRes, ConfigReq, ConfigRes, SaveReq, SaveRes } from '../defines/common/models';
import { ParamsDictionary, Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { Service } from './service';

export namespace Controller {
    export async function response(app: any) {
        /**
         * 저장
         */
        doCommonResponse<SaveReq, any, SaveRes>(app, 'save', 'post', async (req, res) => {
            const saveRes = Service.postSave(req.body);
            res.status(saveRes.status).send(saveRes);
        });

        /**
         * 설정 불러오기
         */
        doCommonResponse<void, any, ConfigRes>(app, 'config', 'get', async (req, res) => {
            const configRes = Service.getConfig();
            res.status(configRes.status).send(configRes);
        });

        /**
         * 설정 저장
         */
        doCommonResponse<ConfigReq, any, ConfigRes>(app, 'config/countries', 'patch', async (req, res) => {
            const configRes = Service.postConfig(req.body);
            res.status(configRes.status).send(configRes);
        });
    }

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

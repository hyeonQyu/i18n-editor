import axios, { AxiosInstance } from 'axios';
import { ConfigRes, SaveReq, SaveRes } from '@defines/common/models';

export namespace HomeApi {
    let client: AxiosInstance;

    export function setPort(port: number) {
        client = axios.create({ baseURL: `http://localhost:${port}/api` });
    }

    /**
     * 저장 (다국어 JSON 파일 생성)
     * @param req
     */
    export async function postSave(req: SaveReq): Promise<SaveRes> {
        return (await client.post('/save', req)).data;
    }

    /**
     * 설정 불러오기
     */
    export async function getConfig(): Promise<ConfigRes> {
        return (await client.get('/config')).data;
    }
}

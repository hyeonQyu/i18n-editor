import axios, { AxiosInstance } from 'axios';
import { SaveReq } from '@defines/common/models';

export namespace HomeApi {
    let client: AxiosInstance;

    export function setPort(port: number) {
        client = axios.create({ baseURL: `http://localhost:${port}/api` });
    }

    export async function postSave(req: SaveReq): Promise<void> {
        return (await client.post('/save', req)).data;
    }
}

import axios, { AxiosInstance } from 'axios';
import { DirectoryReq, DirectoryRes } from 'i18n-editor-common';

export namespace HomeApi {
  let client: AxiosInstance;

  export function setPort(port: number) {
    client = axios.create({ baseURL: `http://localhost:${port}/api` });
  }

  /**
   * 디렉토리 내 정보 불러오기
   * @param req
   */
  export async function getDirectory(req: DirectoryReq): Promise<DirectoryRes> {
    return (await client.get('/directory', { params: req })).data;
  }
}

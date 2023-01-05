import axios, { AxiosInstance } from 'axios';
import { GetDirectoryReq, GetDirectoryRes, GetTranslationFileReq, GetTranslationFileRes } from 'i18n-editor-common';

export namespace HomeApi {
  let client: AxiosInstance;

  export function setPort(port: number) {
    client = axios.create({ baseURL: `http://localhost:${port}/api` });
  }

  /**
   * 디렉토리 내 정보 불러오기
   * @param req
   */
  export async function getDirectory(req: GetDirectoryReq): Promise<GetDirectoryRes> {
    return (await client.get('/directory', { params: req })).data;
  }

  /**
   * 선택된 경로 내에 있는 다국어 번역 파일 목록 불러오기
   * @param req
   */
  export async function getTranslationFile(req: GetTranslationFileReq): Promise<GetTranslationFileRes> {
    return (await client.get('./translation-file', { params: req })).data;
  }
}

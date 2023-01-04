import axios, { AxiosInstance } from 'axios';
import { DirectoryReq, DirectoryRes, TranslationFileReq, TranslationFileRes } from 'i18n-editor-common';

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

  /**
   * 선택된 경로 내에 있는 다국어 번역 파일 목록 불러오기
   * @param req
   */
  export async function getTranslationFile(req: TranslationFileReq): Promise<TranslationFileRes> {
    return (await client.get('./translation-file', { params: req })).data;
  }
}

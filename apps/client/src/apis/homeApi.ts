import axios, { AxiosInstance } from 'axios';
import {
  DeleteContentColumnReq,
  DeleteContentColumnRes,
  DeleteContentRowReq,
  DeleteContentRowRes,
  GetConfigRes,
  GetContentReq,
  GetContentRes,
  GetDirectoryReq,
  GetDirectoryRes,
  GetNativeFileExplorerReq,
  GetNativeFileExplorerRes,
  GetTranslationFileReq,
  GetTranslationFileRes,
  PatchContentReq,
  PatchContentRes,
  PostContentColumnReq,
  PostContentColumnRes,
  PostContentRowReq,
  PostContentRowRes,
  PostDirectoryReq,
  PostDirectoryRes,
  PostTranslationFileReq,
  PostTranslationFileRes,
} from 'i18n-editor-common';
import { AxiosInstanceProps } from '@defines/axios';

export namespace HomeApi {
  let client: AxiosInstance;

  export function createAxiosInstance({ port, responseInterceptor }: AxiosInstanceProps) {
    client = axios.create({ baseURL: `http://localhost:${port}/api` });

    if (responseInterceptor) {
      const { onFulfilled, onRejected, options } = responseInterceptor;
      client.interceptors.response.use(onFulfilled, onRejected, options);
    }
  }

  /**
   * 설정 불러오기
   */
  export async function getConfig(): Promise<GetConfigRes> {
    return (await client.get('/config')).data;
  }

  /**
   * 디렉토리 내 정보 불러오기
   * @param req
   */
  export async function getDirectory(req: GetDirectoryReq): Promise<GetDirectoryRes> {
    return (await client.get('/directory', { params: req })).data;
  }

  /**
   * 디렉토리 및 파일 생성
   * @param req
   */
  export async function postDirectory(req: PostDirectoryReq): Promise<PostDirectoryRes> {
    return (await client.post('/directory', req)).data;
  }

  /**
   * 파일 탐색기 열기
   * @param req
   */
  export async function getNativeFileExplorer(req: GetNativeFileExplorerReq): Promise<GetNativeFileExplorerRes> {
    return (await client.get('/native/file-explorer', { params: req })).data;
  }

  /**
   * 선택된 경로 내에 있는 다국어 번역 파일 목록 불러오기
   * @param req
   */
  export async function getTranslationFile(req: GetTranslationFileReq): Promise<GetTranslationFileRes> {
    return (await client.get('/translation-file', { params: req })).data;
  }

  /**
   * 다국어 번역 파일 생성
   * @param req
   */
  export async function postTranslationFile(req: PostTranslationFileReq): Promise<PostTranslationFileRes> {
    return (await client.post('/translation-file', req)).data;
  }

  /**
   * 선택한 다국어 번역 파일 내용 불러오기
   * @param req
   */
  export async function getContent(req: GetContentReq): Promise<GetContentRes> {
    return (await client.get('/content', { params: req })).data;
  }

  /**
   * 다국어 번역 파일 내용 편집
   * @param req
   */
  export async function patchContent(req: PatchContentReq): Promise<PatchContentRes> {
    return (await client.patch('/content', req)).data;
  }

  /**
   * 행 추가
   * @param req
   */
  export async function postContentRow(req: PostContentRowReq): Promise<PostContentRowRes> {
    return (await client.post('/content/row', req)).data;
  }

  /**
   * 번역 삭제
   * @param req
   */
  export async function deleteContentRow(req: DeleteContentRowReq): Promise<DeleteContentRowRes> {
    return (await client.delete('/content/row', { data: req })).data;
  }

  /**
   * 열 추가
   * @param req
   */
  export async function postContentColumn(req: PostContentColumnReq): Promise<PostContentColumnRes> {
    return (await client.post('/content/column', req)).data;
  }

  /**
   * 열 삭제
   * @param req
   */
  export async function deleteContentColumn(req: DeleteContentColumnReq): Promise<DeleteContentColumnRes> {
    return (await client.delete('/content/column', { data: req })).data;
  }
}

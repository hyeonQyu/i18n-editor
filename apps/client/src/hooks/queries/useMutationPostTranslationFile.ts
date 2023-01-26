import { MUTATION_KEY, UseMutationParams } from '@defines/reactQuery';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { HomeApi } from '@apis/homeApi';
import { PostTranslationFileReq, PostTranslationFileRes } from 'i18n-editor-common';

type Request = PostTranslationFileReq;

type Response = PostTranslationFileRes;

export interface UseMutationPostTranslationFileParams extends UseMutationParams<Response, Request> {}

export type UseMutationPostTranslationFile = UseMutationResult<Response, AxiosError<Response>, Request>;

function useMutationPostTranslationFile(params: UseMutationPostTranslationFileParams): UseMutationPostTranslationFile {
  const { mutationOption } = params;

  return useMutation({
    mutationKey: MUTATION_KEY.content.postTranslationFile(),
    mutationFn: HomeApi.postTranslationFile,
    ...mutationOption,
  });
}

export default useMutationPostTranslationFile;

import { MUTATION_KEY, UseMutationParams } from '@defines/reactQuery';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PostDirectoryReq, PostDirectoryRes } from 'i18n-editor-common';
import { HomeApi } from '@apis/homeApi';

type Request = PostDirectoryReq;

type Response = PostDirectoryRes;

export interface UseMutationPostDirectoryParams extends UseMutationParams<Response, Request> {}

export type UseMutationPostDirectory = UseMutationResult<Response, AxiosError<Response>, Request>;

function useMutationPostDirectory(params: UseMutationPostDirectoryParams): UseMutationPostDirectory {
  const { mutationOption } = params;

  return useMutation({
    mutationKey: MUTATION_KEY.content.postDirectory(),
    mutationFn: HomeApi.postDirectory,
    ...mutationOption,
  });
}

export default useMutationPostDirectory;

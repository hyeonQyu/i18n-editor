import { MUTATION_KEY, UseMutationParams } from '@defines/reactQuery';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PostContentColumnReq, PostContentColumnRes } from 'i18n-editor-common';
import { HomeApi } from '@apis/homeApi';

type Request = PostContentColumnReq;

type Response = PostContentColumnRes;

export interface UseMutationPostContentColumnParams extends UseMutationParams<Response, Request> {}

export type UseMutationPostContentColumn = UseMutationResult<Response, AxiosError<Response>, Request>;

function useMutationPostContentColumn(params: UseMutationPostContentColumnParams): UseMutationPostContentColumn {
  const { mutationOption } = params;

  return useMutation({
    mutationKey: MUTATION_KEY.content.postContentColumn(),
    mutationFn: HomeApi.postContentColumn,
    ...mutationOption,
  });
}

export default useMutationPostContentColumn;

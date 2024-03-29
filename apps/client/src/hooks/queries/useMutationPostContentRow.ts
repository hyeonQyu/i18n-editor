import { MUTATION_KEY, UseMutationParams } from '@defines/reactQuery';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PostContentRowReq, PostContentRowRes } from 'i18n-editor-common';
import { HomeApi } from '@apis/homeApi';

type Request = PostContentRowReq;

type Response = PostContentRowRes;

export interface UseMutationPostContentRowParams extends UseMutationParams<Response, Request> {}

export type UseMutationPostContentRow = UseMutationResult<Response, AxiosError<Response>, Request>;

function useMutationPostContentRow(params: UseMutationPostContentRowParams): UseMutationPostContentRow {
  const { mutationOption } = params;

  return useMutation({
    mutationKey: MUTATION_KEY.content.postContentRow(),
    mutationFn: HomeApi.postContentRow,
    ...mutationOption,
  });
}

export default useMutationPostContentRow;

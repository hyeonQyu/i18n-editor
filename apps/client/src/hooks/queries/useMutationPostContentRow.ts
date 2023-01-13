import { UseMutationParams } from '@defines/reactQuery';
import { PostContentRowReq, PostContentRowRes } from 'i18n-editor-common';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { HomeApi } from '@apis/homeApi';

export interface IUseMutationPostContentRowParams extends UseMutationParams<PostContentRowRes, PostContentRowReq> {}

export type IUseMutationPostContentRow = UseMutationResult<PostContentRowRes, AxiosError<PostContentRowRes>, PostContentRowReq>;

function useMutationPostContentRow(params: IUseMutationPostContentRowParams): IUseMutationPostContentRow {
  const { mutationOption } = params;

  return useMutation<PostContentRowRes, AxiosError<PostContentRowRes>, PostContentRowReq>({
    ...mutationOption,
    mutationFn: HomeApi.postContentRow,
  });
}

export default useMutationPostContentRow;

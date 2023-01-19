import { UseMutationParams } from '@defines/reactQuery';
import { PostContentColumnReq, PostContentColumnRes } from 'i18n-editor-common';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { HomeApi } from '@apis/homeApi';

export interface IUseMutationPostContentColumnParams extends UseMutationParams<PostContentColumnRes, PostContentColumnReq> {}

export type IUseMutationPostContentColumn = UseMutationResult<PostContentColumnRes, AxiosError<PostContentColumnRes>, PostContentColumnReq>;

function useMutationPostContentColumn(params: IUseMutationPostContentColumnParams): IUseMutationPostContentColumn {
  const { mutationOption } = params;

  return useMutation({
    mutationFn: HomeApi.postContentColumn,
    ...mutationOption,
  });
}

export default useMutationPostContentColumn;

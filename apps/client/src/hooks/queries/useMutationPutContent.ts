import { UseMutationParams } from '@defines/reactQuery';
import { PutContentReq, PutContentRes } from 'i18n-editor-common';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { HomeApi } from '@apis/homeApi';

export interface IUseMutationPutContentParams extends UseMutationParams<PutContentRes, PutContentReq> {}

export type IUseMutationPutContent = UseMutationResult<PutContentRes, AxiosError<PutContentRes>, PutContentReq>;

function useMutationPutContent(params: IUseMutationPutContentParams): IUseMutationPutContent {
  const { mutationOption } = params;

  return useMutation<PutContentRes, AxiosError<PutContentRes>, PutContentReq>({
    ...mutationOption,
    mutationFn: HomeApi.putContent,
  });
}

export default useMutationPutContent;

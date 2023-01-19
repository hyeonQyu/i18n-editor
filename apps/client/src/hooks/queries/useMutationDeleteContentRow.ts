import { UseMutationParams } from '@defines/reactQuery';
import { DeleteContentRowReq, DeleteContentRowRes } from 'i18n-editor-common';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { HomeApi } from '@apis/homeApi';

export interface IUseMutationDeleteContentRowParams extends UseMutationParams<DeleteContentRowRes, DeleteContentRowReq> {}

export type IUseMutationDeleteContentRow = UseMutationResult<DeleteContentRowRes, AxiosError<DeleteContentRowRes>, DeleteContentRowReq>;

function useMutationDeleteContentRow(params: IUseMutationDeleteContentRowParams): IUseMutationDeleteContentRow {
  const { mutationOption } = params;

  return useMutation({
    mutationFn: HomeApi.deleteContentRow,
    ...mutationOption,
  });
}

export default useMutationDeleteContentRow;

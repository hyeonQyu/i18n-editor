import { MUTATION_KEY, UseMutationParams } from '@defines/reactQuery';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { DeleteContentRowReq, DeleteContentRowRes } from 'i18n-editor-common';
import { HomeApi } from '@apis/homeApi';

type Request = DeleteContentRowReq;

type Response = DeleteContentRowRes;

export interface UseMutationDeleteContentRowParams extends UseMutationParams<Response, Request> {}

export type UseMutationDeleteContentRow = UseMutationResult<Response, AxiosError<Response>, Request>;

function useMutationDeleteContentRow(params: UseMutationDeleteContentRowParams): UseMutationDeleteContentRow {
  const { mutationOption } = params;

  return useMutation({
    mutationKey: MUTATION_KEY.content.deleteContentRow(),
    mutationFn: HomeApi.deleteContentRow,
    ...mutationOption,
  });
}

export default useMutationDeleteContentRow;

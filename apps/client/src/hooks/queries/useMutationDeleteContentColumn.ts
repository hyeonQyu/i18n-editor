import { MUTATION_KEY, UseMutationParams } from '@defines/reactQuery';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { DeleteContentColumnReq, DeleteContentColumnRes } from 'i18n-editor-common';
import { Api } from '@apis/api';

type Request = DeleteContentColumnReq;

type Response = DeleteContentColumnRes;

export interface UseMutationDeleteContentColumnParams extends UseMutationParams<Response, Request> {}

export type UseMutationDeleteContentColumn = UseMutationResult<Response, AxiosError<Response>, Request>;

function useMutationDeleteContentColumn(params: UseMutationDeleteContentColumnParams): UseMutationDeleteContentColumn {
  const { mutationOption } = params;

  return useMutation({
    mutationKey: MUTATION_KEY.content.deleteContentColumn(),
    mutationFn: Api.deleteContentColumn,
    ...mutationOption,
  });
}

export default useMutationDeleteContentColumn;

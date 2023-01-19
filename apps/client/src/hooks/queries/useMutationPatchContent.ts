import { UseMutationParams } from '@defines/reactQuery';
import { PatchContentReq, PatchContentRes } from 'i18n-editor-common';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { HomeApi } from '@apis/homeApi';

export interface IUseMutationPatchContentParams extends UseMutationParams<PatchContentRes, PatchContentReq> {}

export type IUseMutationPatchContent = UseMutationResult<PatchContentRes, AxiosError<PatchContentRes>, PatchContentReq>;

function useMutationPatchContent(params: IUseMutationPatchContentParams): IUseMutationPatchContent {
  const { mutationOption } = params;

  return useMutation({
    mutationFn: HomeApi.patchContent,
    ...mutationOption,
  });
}

export default useMutationPatchContent;

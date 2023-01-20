import { MUTATION_KEY, UseMutationParams } from '@defines/reactQuery';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PatchContentReq, PatchContentRes } from 'i18n-editor-common';
import { HomeApi } from '@apis/homeApi';

type Request = PatchContentReq;

type Response = PatchContentRes;

export interface UseMutationPatchContentParams extends UseMutationParams<Response, Request> {}

export type UseMutationPatchContent = UseMutationResult<Response, AxiosError<Response>, Request>;

function useMutationPatchContent(params: UseMutationPatchContentParams): UseMutationPatchContent {
  const { mutationOption } = params;

  return useMutation({
    mutationKey: MUTATION_KEY.content.patchContent(),
    mutationFn: HomeApi.patchContent,
    ...mutationOption,
  });
}

export default useMutationPatchContent;

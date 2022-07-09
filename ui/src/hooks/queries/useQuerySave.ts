import { useMutation, UseMutationResult } from 'react-query';
import { SaveReq } from '@defines/common/models';
import { HomeApi } from '@apis/homeApi';
import useAlert from '@hooks/common/useAlert';
import { AxiosError } from 'axios';

export interface IUseQuerySaveParams {
    saveReq: SaveReq;
}

export interface IUseQuerySave {}

export default function useQuerySave(params: IUseQuerySaveParams): UseMutationResult<void, AxiosError> {
    const { saveReq } = params;
    const { showAlert } = useAlert();

    return useMutation(['save'], () => HomeApi.postSave(saveReq), {
        onSuccess: () => {
            showAlert('저장했습니다', 'success');
        },
        onError: (error: AxiosError) => {
            switch (error.response?.status) {
                case 500:
                    showAlert('저장 중 문제가 발생했어요 에러 로그를 확인하세요', 'error');
                    break;

                default:
                    showAlert('저장 실패했어요 프로그램을 다시 실행하세요', 'error');
                    break;
            }
        },
    });
}

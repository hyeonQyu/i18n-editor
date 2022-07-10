import { useQuery, UseQueryResult } from 'react-query';
import { ConfigRes } from '@defines/common/models';
import { AxiosError } from 'axios';
import { HomeApi } from '@apis/homeApi';
import useAlert from '@hooks/common/useAlert';

export default function useQueryGetConfig(): UseQueryResult<ConfigRes, AxiosError> {
    const { showAlert } = useAlert();

    return useQuery(['config'], HomeApi.getConfig, {
        refetchOnWindowFocus: false,
        retry: 1,
        onError: () => {
            showAlert('알 수 없는 오류가 발생했어요 프로그램을 다시 실행하세요', 'error');
        },
    });
}

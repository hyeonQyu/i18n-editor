import useQueryGetConfig from '@hooks/queries/useQueryGetConfig';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { axiosInstanceCreatedState, localeDirectoryPathState } from '@stores/store';

export interface UseConfig {
  isLoadingGetConfig: boolean;
}

export default function useConfig(): UseConfig {
  const axiosInstanceCreated = useRecoilValue(axiosInstanceCreatedState);
  const setLocaleDirectoryPath = useSetRecoilState(localeDirectoryPathState);

  const { isLoading: isLoadingGetConfig } = useQueryGetConfig({
    queryOption: {
      enabled: axiosInstanceCreated,
      refetchOnWindowFocus: false,
      onSuccess({ data }) {
        if (!data) return;
        setLocaleDirectoryPath(data.config.localeDirectoryPath);
      },
    },
  });

  return {
    isLoadingGetConfig,
  };
}

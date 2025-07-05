import { UIReadResponse } from '@i18n-editor/shared';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/reactQuery.query.constants';
import { QueryOption } from '../../../types/reactQuery.types';
import { useElectronAPI } from '../../common/useElectronAPI';

export const useQueryReadUIConfig = (option: QueryOption<UIReadResponse, typeof QUERY_KEY.config.ui.read> = {}) => {
  const electronAPI = useElectronAPI();

  return useQuery({
    queryKey: QUERY_KEY.config.ui.read(),
    queryFn: () => electronAPI.config.ui.read(),
    ...option,
  });
};

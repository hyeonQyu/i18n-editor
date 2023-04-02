import { useRecoilState } from 'recoil';
import { fileExplorerStates } from '@components/directorySelector/components/fileExplorer/stores/store';
import { CustomEventHandler } from '@defines/event';
import { SelectButtonChangeParams } from 'primereact/selectbutton';
import { ViewType } from '@components/directorySelector/defines';
import { ViewOptionSelectorProps } from '@components/directorySelector/components/fileExplorer/components/viewOptionSelector';

export interface UseViewOptionSelectorParams extends ViewOptionSelectorProps {}

export interface UseViewOptionSelector {
  viewType: ViewType;
  handleChange: CustomEventHandler<SelectButtonChangeParams>;
}

export default function useViewOptionSelector(params: UseViewOptionSelectorParams): UseViewOptionSelector {
  const {} = params;

  const [viewType, setViewType] = useRecoilState(fileExplorerStates.viewType);

  const handleChange: CustomEventHandler<SelectButtonChangeParams> = (e) => {
    if (!e) return;
    setViewType(e.value);
  };

  return {
    viewType,
    handleChange,
  };
}

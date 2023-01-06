import { useState } from 'react';
import { ViewType } from '@components/directorySelector/defines';
import { SelectButtonChangeParams } from 'primereact/selectbutton';
import { CustomEventHandler } from '@defines/event';

export interface IUseViewOptionParams {}

export interface IUseViewOption {
  viewType: ViewType;
  handleViewTypeChange: CustomEventHandler<SelectButtonChangeParams>;
}

function useViewOption(params: IUseViewOptionParams): IUseViewOption {
  const {} = params;

  const [viewType, setViewType] = useState<ViewType>('table');

  const handleViewTypeChange: CustomEventHandler<SelectButtonChangeParams> = (e) => {
    if (!e) return;
    setViewType(e.value);
  };

  return {
    viewType,
    handleViewTypeChange,
  };
}

export default useViewOption;

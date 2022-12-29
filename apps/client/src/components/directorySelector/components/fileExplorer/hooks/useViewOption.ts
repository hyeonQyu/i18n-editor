import { useState } from 'react';
import { DirectorySelectorEventHandler, ViewType } from '@components/directorySelector/defines';
import { SelectButtonChangeParams } from 'primereact/selectbutton';

export interface IUseViewOptionParams {}

export interface IUseViewOption {
  viewType: ViewType;
  handleViewTypeChange: DirectorySelectorEventHandler<SelectButtonChangeParams>;
}

function useViewOption(params: IUseViewOptionParams): IUseViewOption {
  const {} = params;

  const [viewType, setViewType] = useState<ViewType>('table');

  const handleViewTypeChange: DirectorySelectorEventHandler<SelectButtonChangeParams> = (e) => {
    if (!e?.value) return;
    setViewType(e.value);
  };

  return {
    viewType,
    handleViewTypeChange,
  };
}

export default useViewOption;

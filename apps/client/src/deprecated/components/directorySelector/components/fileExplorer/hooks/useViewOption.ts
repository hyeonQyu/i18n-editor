import { ViewType } from '../../../defines';
import { CustomEventHandler } from '../../../../../defines/event';
import { SelectButtonChangeParams } from 'primereact/selectbutton';
import { useState } from 'react';
/**
 * @deprecated
 */
export interface IUseViewOptionParams {}
/**
 * @deprecated
 */
export interface IUseViewOption {
  viewType: ViewType;
  handleViewTypeChange: CustomEventHandler<SelectButtonChangeParams>;
}

/**
 * @deprecated
 */
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

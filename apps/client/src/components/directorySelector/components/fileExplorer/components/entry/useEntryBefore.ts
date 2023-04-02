import { EntryBeforeProps } from '@components/directorySelector/components/fileExplorer/components/entry/EntryBefore';
import { MouseEventHandler } from 'react';

export interface IUseEntryParams extends EntryBeforeProps {}

export interface IUseEntry {
  handleClick: MouseEventHandler<HTMLDivElement>;
}

function useEntryBefore(params: IUseEntryParams): IUseEntry {
  const { entry, onClick } = params;

  const handleClick: MouseEventHandler<HTMLDivElement> = () => {
    onClick(entry);
  };

  return {
    handleClick,
  };
}

export default useEntryBefore;

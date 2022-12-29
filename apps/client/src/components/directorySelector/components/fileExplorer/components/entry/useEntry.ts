import { EntryProps } from '@components/directorySelector/components/fileExplorer/components/entry/Entry';
import { MouseEventHandler } from 'react';

export interface IUseEntryParams extends EntryProps {}

export interface IUseEntry {
  handleClick: MouseEventHandler<HTMLDivElement>;
}

function useEntry(params: IUseEntryParams): IUseEntry {
  const { entry, onClick } = params;

  const handleClick: MouseEventHandler<HTMLDivElement> = () => {
    onClick(entry);
  };

  return {
    handleClick,
  };
}

export default useEntry;

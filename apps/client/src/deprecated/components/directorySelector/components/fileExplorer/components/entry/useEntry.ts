import { EntryProps } from './Entry';
import { MouseEventHandler } from 'react';

/**
 * @deprecated
 */
export interface IUseEntryParams extends EntryProps {}

/**
 * @deprecated
 */
export interface IUseEntry {
  handleClick: MouseEventHandler<HTMLDivElement>;
}

/**
 * @deprecated
 */
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

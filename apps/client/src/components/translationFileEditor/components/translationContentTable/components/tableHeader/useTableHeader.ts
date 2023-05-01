import { MouseEventHandler } from 'react';
import { TableHeaderProps } from '@components/translationFileEditor/components/translationContentTable/components/tableHeader/TableHeader';

export interface UseTableHeaderParams extends TableHeaderProps {}

export interface UseTableHeader {
  handleAddColumnClick: MouseEventHandler<HTMLButtonElement>;
}

export default function useTableHeader(params: UseTableHeaderParams): UseTableHeader {
  const {} = params;

  const handleAddColumnClick: MouseEventHandler<HTMLButtonElement> = () => {};

  return {
    handleAddColumnClick,
  };
}

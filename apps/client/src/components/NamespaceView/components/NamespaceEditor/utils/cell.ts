import { Cell } from '@components/NamespaceView/components/NamespaceEditor/defines/table';

export const createCell = (value: string, metadata: Cell['metadata'] = {}): Cell => {
  return {
    value,
    metadata,
  };
};

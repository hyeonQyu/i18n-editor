import { Cell } from '@components/NamespaceView/components/NamespaceEditor/defines/table';

export const createCell = (value: string): Cell => {
  return {
    value,
    metadata: {},
  };
};

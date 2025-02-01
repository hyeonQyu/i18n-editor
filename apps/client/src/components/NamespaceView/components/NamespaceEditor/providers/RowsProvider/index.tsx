import { EMPTY_ROWS, RowData } from '@components/NamespaceView/components/NamespaceEditor/defines/table';
import { translationsToRows } from '@components/NamespaceView/components/NamespaceEditor/providers/RowsProvider/utils/rows';
import { createCell } from '@components/NamespaceView/components/NamespaceEditor/utils/cell';
import { useNamespaceViewSearchStore } from '@components/NamespaceView/stores/search';
import useLanguageCodes from '@hooks/language/useLanguageCodes';
import useTranslations from '@hooks/translation/useTranslations';
import { TIME_UNIT } from 'i18n-editor-common';
import { throttle } from 'lodash';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';

interface RowsContextProps {
  rows: RowData[];
  setRows: Dispatch<SetStateAction<RowData[]>>;
}

const RowsContext = createContext<RowsContextProps>({
  rows: EMPTY_ROWS,
  setRows: () => {},
});

export const useRows = () => {
  const { rows } = useContext(RowsContext);
  return rows;
};

export const useSetRows = () => {
  const { setRows } = useContext(RowsContext);
  return setRows;
};

interface RowsProviderProps {
  children: ReactNode;
}

function RowsProvider(props: RowsProviderProps) {
  const { children } = props;

  const languageCodes = useLanguageCodes();
  const translations = useTranslations();

  const keyword = useNamespaceViewSearchStore((state) => state.keyword);

  const emptyRow: RowData = useMemo(
    () =>
      languageCodes.reduce(
        (acc, code) => {
          acc[code] = createCell('');
          return acc;
        },
        {
          key: createCell(''),
        } as RowData,
      ),
    [languageCodes],
  );

  const [rows, setRows] = useState<RowData[]>([emptyRow]);

  const namespaceRows = useMemo(() => translationsToRows(translations, languageCodes), [translations, languageCodes]);

  const throttledSetRows = useMemo(
    () =>
      throttle((newRows: RowData[], searchKeyword: string) => {
        setRows(
          newRows
            .filter((row) => {
              return Object.values(row).some((cell) => cell?.value.toLowerCase().includes(searchKeyword.toLowerCase()));
            })
            .concat(emptyRow),
        );
      }, TIME_UNIT.unitOfMs.asSecond * 0.5),
    [emptyRow],
  );

  useEffect(() => {
    throttledSetRows(namespaceRows, keyword);
  }, [namespaceRows, keyword, throttledSetRows]);

  useEffect(() => {
    return () => {
      throttledSetRows.cancel();
    };
  }, [throttledSetRows]);

  return (
    <RowsContext.Provider
      value={useMemo(
        () => ({
          rows,
          setRows,
        }),
        [rows, setRows],
      )}
    >
      {children}
    </RowsContext.Provider>
  );
}

export default RowsProvider;

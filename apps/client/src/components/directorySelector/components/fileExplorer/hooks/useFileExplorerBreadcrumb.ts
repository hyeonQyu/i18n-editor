import { useRecoilValue } from 'recoil';
import { fileExplorerStates } from '@components/directorySelector/components/fileExplorer/stores/store';
import { useMemo } from 'react';
import { MenuItem } from 'primereact/menuitem';
import useFileExplorerPathChange from '@components/directorySelector/components/fileExplorer/hooks/useFileExplorerPathChange';
import { PrimeIcons } from 'primereact/api';

export interface UseFileExplorerBreadcrumb {
  home: MenuItem;
  breadcrumbItems: MenuItem[];
}

const home: MenuItem = {
  icon: PrimeIcons.USER,
};

export default function useFileExplorerBreadcrumb(): UseFileExplorerBreadcrumb {
  const path = useRecoilValue(fileExplorerStates.path);

  const { changePathForward } = useFileExplorerPathChange();

  const breadcrumbItemLabels: string[] = useMemo(() => path.split('/'), [path]);

  const breadcrumbItems: MenuItem[] = useMemo(
    () =>
      breadcrumbItemLabels.map((label, i) => ({
        id: i.toString(),
        label,
        command(e) {
          const {
            item: { id },
          } = e;
          changePathForward(breadcrumbItemLabels.slice(0, Number(id) + 1).join('/'), true);
        },
      })),
    [breadcrumbItemLabels, changePathForward],
  );

  return {
    home,
    breadcrumbItems,
  };
}

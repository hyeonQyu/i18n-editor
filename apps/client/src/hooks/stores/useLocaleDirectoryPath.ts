import { SetterOrUpdater, useRecoilState } from 'recoil';
import { localeDirectoryPathState } from '@stores/store';

export interface UseLocaleDirectoryPath {
  localeDirectoryPath: string | undefined;
  setLocaleDirectoryPath: SetterOrUpdater<string | undefined>;
}

export default function useLocaleDirectoryPath(): UseLocaleDirectoryPath {
  const [localeDirectoryPath, setLocaleDirectoryPath] = useRecoilState(localeDirectoryPathState);

  return {
    localeDirectoryPath,
    setLocaleDirectoryPath,
  };
}

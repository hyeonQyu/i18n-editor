import BorderBox from '@components/BorderBox';
import { useFileManagerDialogStore } from '@components/FileManagerDialog/stores';
import HomeIcon from '@mui/icons-material/Home';
import { Breadcrumbs, Link } from '@mui/material';

interface BreadcrumbItem {
  label: string;
  path: string;
}

function FileManagerBreadcrumbs() {
  const path = useFileManagerDialogStore(({ path }) => path);
  const movePathTo = useFileManagerDialogStore(({ movePathTo }) => movePathTo);

  const breadcrumbs: BreadcrumbItem[] =
    path
      ?.split('/')
      .filter(Boolean)
      .reduce((acc, label) => {
        const path = acc.length ? `${acc[acc.length - 1].path}/${label}` : label;
        acc.push({ path, label });
        return acc;
      }, [] as BreadcrumbItem[]) ?? [];

  const getHandleClick = (_path: string) => () => movePathTo(_path);

  return (
    <BorderBox
      sx={{
        maxWidth: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
      }}
    >
      <Breadcrumbs
        sx={{
          overflowX: 'auto',
          width: '100%',
          scrollbarWidth: 'none',

          '&::webkit-scrollbar': {
            display: 'none',
          },

          '& .MuiBreadcrumbs-ol': {
            flexWrap: 'nowrap',
          },

          '& .MuiBreadcrumbs-separator': {
            margin: '6px',
          },
        }}
      >
        <Link component={'button'} onClick={getHandleClick('/')} color={'inherit'} sx={{ display: 'flex', alignItems: 'center' }}>
          <HomeIcon />
        </Link>

        {breadcrumbs.map(({ label, path }) => (
          <Link
            key={path}
            onClick={getHandleClick(path)}
            component={'button'}
            color={'inherit'}
            underline={'hover'}
            sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}
          >
            {label}
          </Link>
        ))}
      </Breadcrumbs>
    </BorderBox>
  );
}

export default FileManagerBreadcrumbs;

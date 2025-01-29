import { WorkspaceToolbarButtonProps } from '@components/WorkspaceView/components/WorkspaceToolbar/components/WorkspaceToolbarButton';
import useAddNamespaceClickHandler from '@hooks/namespace/useAddNamespaceClickHandler';
import AddIcon from '@mui/icons-material/Add';

function useAddNamespaceToolbarButtonProps(): WorkspaceToolbarButtonProps {
  const addNamespace = useAddNamespaceClickHandler();

  return {
    IconComponent: AddIcon,
    label: '네임스페이스 추가',
    onClick: addNamespace,
  };
}

export default useAddNamespaceToolbarButtonProps;

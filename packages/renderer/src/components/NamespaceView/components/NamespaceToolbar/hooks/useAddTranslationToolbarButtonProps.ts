import { useOpenTranslationAddDialog } from '@/components/NamespaceView/components/TranslationAddDialog';
import { ToolbarButtonProps } from '@/components/Toolbar/components/ToolbarButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export const useAddTranslationToolbarButtonProps = (): ToolbarButtonProps => {
  const openTranslationAddDialog = useOpenTranslationAddDialog();

  return {
    IconComponent: AddOutlinedIcon,
    tooltip: '번역 추가',
    onClick: () => openTranslationAddDialog(),
    color: 'white',
  };
};

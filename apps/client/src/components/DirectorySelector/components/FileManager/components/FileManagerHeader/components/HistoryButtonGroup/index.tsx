import HistoryButtonContainer from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/HistoryButtonGroup/components/HistoryButtonContainer';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ButtonGroup } from '@mui/material';

function HistoryButtonGroup() {
  return (
    <ButtonGroup variant={'outlined'} aria-label={'navigation history button group'}>
      <HistoryButtonContainer tooltipMessage={'뒤로 가기'}>
        <ArrowLeftIcon />
      </HistoryButtonContainer>

      <HistoryButtonContainer tooltipMessage={'앞으로 가기'}>
        <ArrowRightIcon />
      </HistoryButtonContainer>
    </ButtonGroup>
  );
}

export default HistoryButtonGroup;

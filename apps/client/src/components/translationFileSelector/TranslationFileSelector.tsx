import { Button } from 'primereact/button';
import useTranslationFileSelector from '@components/translationFileSelector/useTranslationFileSelector';
import { Dropdown } from 'primereact/dropdown';
import classNames from 'classnames';

export interface TranslationFileSelectorProps {}

const SELECT_ID = 'translation-file';

function TranslationFileSelector(props: TranslationFileSelectorProps) {
  const {} = props;
  const {
    options,
    translationFileName,
    disabled,
    opened,
    tooltipMessage,
    handleShow,
    handleHide,
    handleTranslationFileNameChange,
    handleAddTranslationFileButtonClick,
  } = useTranslationFileSelector(props);

  return (
    <>
      <div className={'p-inputgroup translation-file-selector'}>
        <Button icon={'pi pi-plus'} onClick={handleAddTranslationFileButtonClick} disabled={disabled} />

        <div className={'p-float-label'}>
          <Dropdown
            inputId={SELECT_ID}
            value={translationFileName}
            options={options}
            disabled={disabled}
            onShow={handleShow}
            onHide={handleHide}
            onChange={handleTranslationFileNameChange}
            className={'dropdown'}
            tooltip={tooltipMessage}
            tooltipOptions={{
              position: 'mouse',
              showOnDisabled: true,
              mouseTrack: true,
            }}
          />
          <label htmlFor={SELECT_ID} className={classNames(opened && 'opened', Boolean(translationFileName) && 'selected')}>
            편집할 번역 파일을 선택하세요
          </label>
        </div>
      </div>

      <style jsx>{`
        .translation-file-selector :global(.dropdown) {
          width: 100%;
          height: 47px;
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
        }

        .p-float-label > :global(span) {
          width: 100%;
        }
        .p-float-label > :global(span .p-dropdown) {
          width: 100%;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }

        .p-float-label > label.opened,
        .p-float-label > label.selected {
          top: -0.75rem;
          font-size: 12px;
        }
      `}</style>
    </>
  );
}

export default TranslationFileSelector;

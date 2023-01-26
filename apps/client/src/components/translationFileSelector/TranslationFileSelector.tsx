import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import 'primereact/resources/primereact.css';
import useTranslationFileSelector from '@components/translationFileSelector/useTranslationFileSelector';
import classNames from 'classnames';
import { CustomEventHandler } from '@defines/event';
import { Button } from 'primereact/button';
import { MouseEventHandler } from 'react';

export interface TranslationFileSelectorProps {
  directoryPath: string;
  file?: string;
  files: string[];
  hasDirectorySelectorError: boolean;
  onChange: CustomEventHandler<DropdownChangeParams>;
  onAddTranslationFileButtonClick: MouseEventHandler<HTMLButtonElement>;
}

const selectId = 'translation-file';

export function TranslationFileSelector(props: TranslationFileSelectorProps) {
  const { file, onChange, onAddTranslationFileButtonClick } = props;
  const { options, disabled, opened, tooltipMessage, handleShow, handleHide } = useTranslationFileSelector(props);

  return (
    <>
      <div className={'p-inputgroup'}>
        <Button icon={'pi pi-plus'} onClick={onAddTranslationFileButtonClick} disabled={disabled} />

        <div className={'p-float-label'}>
          <Dropdown
            inputId={selectId}
            value={file}
            options={options}
            disabled={disabled}
            onShow={handleShow}
            onHide={handleHide}
            onChange={onChange}
            className={'dropdown'}
            tooltip={tooltipMessage}
            tooltipOptions={{
              position: 'mouse',
              showOnDisabled: true,
              mouseTrack: true,
            }}
          />
          <label htmlFor={selectId} className={classNames(opened && 'opened', Boolean(file) && 'selected')}>
            편집할 번역 파일을 선택하세요
          </label>
        </div>
      </div>

      <style jsx>{`
        :global(.dropdown) {
          width: 100%;
          height: 47px;
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

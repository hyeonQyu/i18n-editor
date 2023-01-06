import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import 'primereact/resources/primereact.css';
import useTranslationFileSelector from '@components/translationFileSelector/useTranslationFileSelector';
import classNames from 'classnames';
import { CustomEventHandler } from '@defines/event';

export interface TranslationFileSelectorProps {
  directoryPath: string;
  file?: string;
  files: string[];
  onChange: CustomEventHandler<DropdownChangeParams>;
}

const selectId = 'translation-file';

export function TranslationFileSelector(props: TranslationFileSelectorProps) {
  const { file, onChange } = props;
  const { options, disabled, opened, handleShow, handleHide } = useTranslationFileSelector(props);

  return (
    <>
      <span className={'p-float-label'}>
        <Dropdown
          inputId={selectId}
          value={file}
          options={options}
          disabled={disabled}
          onShow={handleShow}
          onHide={handleHide}
          onChange={onChange}
          className={'dropdown'}
          tooltip={disabled ? 'Locale 디렉토리를 먼저 선택하세요' : undefined}
          tooltipOptions={{
            position: 'mouse',
            showOnDisabled: true,
            mouseTrack: true,
          }}
        />
        <label htmlFor={selectId} className={classNames(opened && 'opened', Boolean(file) && 'selected')}>
          편집할 번역 파일
        </label>
      </span>

      <style jsx>{`
        :global(.dropdown) {
          width: 100%;
          height: 47px;
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

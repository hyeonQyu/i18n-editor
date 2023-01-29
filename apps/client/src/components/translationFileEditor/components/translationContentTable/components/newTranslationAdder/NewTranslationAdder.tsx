import useNewTranslationAdder from '@components/translationFileEditor/components/translationContentTable/components/newTranslationAdder/useNewTranslationAdder';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export interface NewTranslationAdderProps {}

const inputId = 'new-translation';

export function NewTranslationAdder(props: NewTranslationAdderProps) {
  const {} = props;
  const { isFiltered, inputTranslationKey, handleFormSubmit } = useNewTranslationAdder({});

  return (
    <>
      {isFiltered ? (
        <div className={'empty'}>검색 결과가 없습니다</div>
      ) : (
        <form onSubmit={handleFormSubmit} className={'add-key'}>
          <div className={'p-inputgroup'}>
            <div className={'p-float-label'}>
              <InputText
                id={inputId}
                value={inputTranslationKey.value}
                onChange={inputTranslationKey.onChange}
                className={'input-translation-key'}
              />
              <label htmlFor={inputId}>새로 추가할 번역 키를 입력하세요</label>
            </div>

            <Button type={'submit'} icon={'pi pi-plus'} />
          </div>
        </form>
      )}

      <style jsx>{`
        .empty {
          width: 100%;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .add-key {
          width: 100%;
        }

        .p-inputgroup {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .p-float-label {
          width: 70%;
        }

        .p-float-label :global(.input-translation-key) {
          width: 100%;
        }
      `}</style>
    </>
  );
}

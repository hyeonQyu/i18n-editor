import useNewTranslationAdder from '@components/translationFileEditor/components/translationContentTable/components/newTranslationAdder/useNewTranslationAdder';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export interface NewTranslationAdderProps {}

const INPUT_ID = 'new-translation';

function NewTranslationAdder(props: NewTranslationAdderProps) {
  const {} = props;
  const { isFiltered, inputTranslationKey, handleFormSubmit } = useNewTranslationAdder(props);

  return (
    <>
      {isFiltered ? (
        <div className={'empty'}>검색 결과가 없습니다</div>
      ) : (
        <form onSubmit={handleFormSubmit} className={'add-key'}>
          <div className={'p-inputgroup'}>
            <div className={'p-float-label'}>
              <InputText
                id={INPUT_ID}
                value={inputTranslationKey.value}
                onChange={inputTranslationKey.onChange}
                className={'input-translation-key'}
              />
              <label htmlFor={INPUT_ID}>새로 추가할 번역 키를 입력하세요</label>
            </div>

            <Button type={'submit'} icon={'pi pi-plus'} />
          </div>
        </form>
      )}

      <style jsx>{``}</style>
    </>
  );
}

export default NewTranslationAdder;

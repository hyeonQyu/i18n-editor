import { SelectButton } from 'primereact/selectbutton';
import { VIEW_OPTIONS } from '@components/directorySelector/defines';
import { SelectButtonTemplate } from '@components/selectButtonTemplate';
import useViewOptionSelector from '@components/directorySelector/components/fileExplorer/components/viewOptionSelector/useViewOptionSelector';

export interface ViewOptionSelectorProps {}

function ViewOptionSelector(props: ViewOptionSelectorProps) {
  const {} = props;
  const { viewType, handleChange } = useViewOptionSelector(props);

  return (
    <>
      <SelectButton
        value={viewType}
        options={VIEW_OPTIONS}
        onChange={handleChange}
        itemTemplate={SelectButtonTemplate}
        unselectable={false}
      />

      <style jsx>{``}</style>
    </>
  );
}

export default ViewOptionSelector;

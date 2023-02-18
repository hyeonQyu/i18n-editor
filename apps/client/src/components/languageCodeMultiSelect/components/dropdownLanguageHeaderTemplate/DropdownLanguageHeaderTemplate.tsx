import { SelectItem } from 'primereact/selectitem';

export interface DropdownLanguageHeaderTemplateProps extends SelectItem {}

export function DropdownLanguageHeaderTemplate(props: DropdownLanguageHeaderTemplateProps) {
  if (!props) return <div className={'container'} style={{ height: 24 }} />;

  const { label, value } = props;

  return (
    <>
      <div className={'container'}>
        <div className={'empty'} />
        <div className={'code'}>{value}</div>
        &nbsp;&nbsp;
        <div className={'name'}>{label}</div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          height: 24px;
        }

        .empty {
          width: 5%;
        }

        .code {
          width: 20%;
          font-weight: bold;
        }

        .name {
          width: 75%;
          font-size: 0.8rem;
        }
      `}</style>
    </>
  );
}

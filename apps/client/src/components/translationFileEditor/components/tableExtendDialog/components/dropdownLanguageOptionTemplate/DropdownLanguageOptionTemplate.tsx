import { SelectItem } from 'primereact/selectitem';

interface DropdownLanguageOptionTemplateProps extends SelectItem {}

export function DropdownLanguageOptionTemplate(props: DropdownLanguageOptionTemplateProps) {
  const { label, value } = props;

  return (
    <>
      <div className={'container'}>
        <div className={'code'}>{value}</div>
        &nbsp;&nbsp;
        <div className={'name'}>{label}</div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
        }

        .code {
          width: 20%;
          font-weight: bold;
        }

        .name {
          width: 80%;
          font-size: 0.8rem;
        }
      `}</style>
    </>
  );
}

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
          width: 25%;
          font-weight: bold;
          text-align: center;
        }

        .name {
          width: 65%;
          font-size: 0.8rem;
        }
      `}</style>
    </>
  );
}

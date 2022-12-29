import { SelectButtonTemplateOption } from '@defines/selectButtonTemplate';

export interface SelectButtonTemplateProps extends SelectButtonTemplateOption {}

export function SelectButtonTemplate(props: SelectButtonTemplateProps) {
  const { icon } = props;
  return <i className={icon} />;
}

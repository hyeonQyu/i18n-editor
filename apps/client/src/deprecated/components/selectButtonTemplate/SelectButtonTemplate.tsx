import { SelectButtonTemplateOption } from '../../defines/selectButtonTemplate';

/**
 * @deprecated
 */
export interface SelectButtonTemplateProps extends SelectButtonTemplateOption {}

/**
 * @deprecated
 */
export function SelectButtonTemplate(props: SelectButtonTemplateProps) {
  const { icon } = props;
  return <i className={icon} />;
}

import useQueryGetDirectory from '@hooks/queries/useQueryGetDirectory';

export interface DirectorySelectorProps {}

export function DirectorySelector(props: DirectorySelectorProps) {
  const {} = props;

  const { data } = useQueryGetDirectory({ req: {} });

  return <></>;
}

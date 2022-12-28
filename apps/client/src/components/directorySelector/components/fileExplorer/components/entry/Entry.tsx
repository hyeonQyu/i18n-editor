import { DirectoryEntry } from 'i18n-editor-common';
import { ICON_BY_DIRECTORY_ENTRY_TYPE } from '@components/directorySelector/defines/constants';
import { Shortening } from '@components/shortening';
import classNames from 'classnames';

export interface EntryProps {
  entry: DirectoryEntry;
}

export function Entry(props: EntryProps) {
  const {
    entry: { name, type },
  } = props;

  return (
    <>
      <div className={'container'}>
        <div className={'icon-container'}>
          <i className={ICON_BY_DIRECTORY_ENTRY_TYPE[type]} style={{ fontSize: '2em' }} />
        </div>
        <Shortening>{name}</Shortening>
      </div>

      <style jsx>{`
        .icon-container {
          margin: 0 auto;
          width: fit-content;
        }

        :global(p) {
          font-size: 0.8rem;
          margin-top: 4px;
          line-height: 1.4;
          text-align: center;
        }
      `}</style>
    </>
  );
}

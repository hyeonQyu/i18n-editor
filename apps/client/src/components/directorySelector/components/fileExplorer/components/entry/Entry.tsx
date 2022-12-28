import { DirectoryEntry } from 'i18n-editor-common';
import { ICON_BY_DIRECTORY_ENTRY_TYPE } from '@components/directorySelector/defines/constants';
import { Shortening } from '@components/shortening';

export interface EntryProps {
  entry: DirectoryEntry;
}

export function Entry(props: EntryProps) {
  const {
    entry: { name, type },
  } = props;

  return (
    <>
      <div className={'entry'}>
        <i className={ICON_BY_DIRECTORY_ENTRY_TYPE[type]} style={{ fontSize: '3em' }} />
        <Shortening>{name}</Shortening>
      </div>

      <style jsx>{`
        .entry {
          width: 100px;
          height: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          cursor: pointer;
          transition: 0.2s;
        }
        .entry:hover {
          background: var(--surface-hover);
          color: var(--primary-color);
        }

        .content-container {
          display: flex;
        }

        :global(p) {
          font-size: 0.8rem;
          margin-top: 10px;
          line-height: 1.4;
          text-align: center;
          width: 100%;
        }
      `}</style>
    </>
  );
}

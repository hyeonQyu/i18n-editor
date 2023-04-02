import { DirectoryEntry } from 'i18n-editor-common';
import classNames from 'classnames';
import { ICON_BY_DIRECTORY_ENTRY_TYPE } from '@components/directorySelector/defines';
import { Shortening } from '@components/shortening';
import { useRecoilValue } from 'recoil';
import { fileExplorerStates } from '@components/directorySelector/components/fileExplorer/stores/store';
import useEntry from '@components/directorySelector/components/fileExplorer/components/entry/useEntry';

export interface EntryProps {
  entry: DirectoryEntry;
}

function Entry(props: EntryProps) {
  const {
    entry: { name, type },
  } = props;

  const { handleClick } = useEntry(props);

  const viewType = useRecoilValue(fileExplorerStates.viewType);

  return (
    <>
      <div className={classNames('entry', viewType)} onClick={handleClick}>
        <i className={classNames(ICON_BY_DIRECTORY_ENTRY_TYPE[type], 'icon', viewType)} />
        <Shortening>{name}</Shortening>
      </div>

      <style jsx>{`
        .entry {
          display: flex;
          border-radius: 10px;
          cursor: pointer;
          transition: 0.2s;
        }
        .entry.list {
          width: calc(100% - 8px);
          height: 30px;
          align-items: center;
          padding: 0 8px;
        }
        .entry.table {
          width: 100px;
          height: 100px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .entry:hover {
          background: var(--surface-hover);
          color: var(--primary-color);
        }

        .icon.list {
          font-size: 1.5em;
        }
        .icon.table {
          font-size: 3em;
        }

        :global(p) {
          font-size: 0.8rem;
          line-height: 1.4;
          width: 100%;
        }
        .list :global(p) {
          margin-left: 4px;
        }
        .table :global(p) {
          margin-top: 10px;
          line-height: 1.4;
          text-align: center;
        }

        .icon.pi-file {
          opacity: 0.7;
        }
      `}</style>
    </>
  );
}

export default Entry;

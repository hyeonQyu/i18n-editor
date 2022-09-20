import { KeyValuePair } from '@defines/common/keyValuePair';
import { MouseEventHandler } from 'react';

export interface JsonPreviewTextInfo {
    keyValue: KeyValuePair<string, string>;
    handleDelete: MouseEventHandler<HTMLButtonElement>;
}

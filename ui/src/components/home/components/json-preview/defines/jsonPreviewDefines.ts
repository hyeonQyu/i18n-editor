import { KeyValuePair } from '@defines/keyValuePair';
import { MouseEventHandler } from 'react';

export interface JsonPreviewTextInfo {
    keyValue: KeyValuePair<string, string>;
    handleDelete: MouseEventHandler<HTMLButtonElement>;
}

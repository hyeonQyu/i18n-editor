import { OS } from 'i18n-editor-common';
import os from 'os';

export const getOS = () => os.platform().toLowerCase().replace(/[0-9]/g, '').replace('darwin', 'macos') as OS;

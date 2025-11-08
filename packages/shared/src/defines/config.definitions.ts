import { LineEnding } from './editor.types';
import { OS } from './utils.types';
import { Workspace } from './workspace.definitions';

const getDefaultLineEnding = (os: OS): LineEnding => {
  return os === 'win' ? 'crlf' : 'lf';
};

export interface Config {
  workspace: Record<string, Workspace>;
  ui: {
    sidebarOpened: boolean;
    windowSize: {
      width: number;
      height: number;
    };
    themeMode: 'light' | 'dark' | undefined;
  };
  editor: {
    jsonFormat: {
      lineEnding: LineEnding;
    };
  };
}

export const getDefaultConfig = (os: OS): Config => ({
  workspace: {},
  ui: {
    sidebarOpened: true,
    windowSize: {
      width: 1200,
      height: 800,
    },
    themeMode: undefined,
  },
  editor: {
    jsonFormat: {
      lineEnding: getDefaultLineEnding(os),
    },
  },
});

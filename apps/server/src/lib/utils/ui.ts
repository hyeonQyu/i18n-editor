import { load } from 'cheerio';
import { exec } from 'child_process';
import { CMD_BY_OS } from '../defines/env';
import { getOS } from './env';
import { readFile } from './file';

const addPortToHTML = async (htmlPath: string, port: number) => {
  const html = await readFile(htmlPath);

  const $ = load(html);
  const $port = $('#port');

  if ($port.length > 0) {
    $port.val(port.toString());
  } else {
    $('body').prepend(`<input type="hidden" id="port" value="${port}"/>`);
  }
};

export const openUI = (port: number) => {
  const appName = 'i18n-editor';
  const htmlPath = `${process.cwd()}/node_modules/${appName}/ui/index.html`;

  addPortToHTML(htmlPath, port);

  exec(`${CMD_BY_OS[getOS()].openUI} ${htmlPath}`);
};

const fs = require('fs');
const cheerio = require('cheerio');

const { exec } = require('child_process');

export namespace UiExecutor {
    export function runHtmlUi(port: number) {
        const htmlPath = `${process.cwd()}/node_modules/locale-json-manager/release-ui/index.html`;
        try {
            addPortToHtml(htmlPath, port);
            exec(`${getCommandLine()} ${htmlPath}`);
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * HTML 코드에 port 번호 삽입
     * @param htmlPath
     * @param port
     * @private
     */
    function addPortToHtml(htmlPath: string, port: number) {
        const html = fs.readFileSync(htmlPath, 'utf-8');

        const $ = cheerio.load(html);
        const $port = $('#port');

        if ($port.length > 0) {
            $port.val(port);
        } else {
            $('body').prepend(`<input type="hidden" id="port" value="${port}"/>`);
        }

        fs.writeFileSync(htmlPath, $.html());
    }

    function getCommandLine(): string {
        switch (process.platform) {
            case 'darwin':
                return 'open';
            case 'win32':
                return 'start';
            default:
                return 'xdg-open';
        }
    }
}

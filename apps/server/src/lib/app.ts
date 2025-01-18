import { TIME_UNIT } from 'i18n-editor-common';
import { AppOption } from './defines/appOption';
import { startCheckMemoryInterval } from './utils/memory';
import { startResponse } from './utils/response';
import { createServer } from './utils/server';
import { UiExecutor } from './utils/uiExecutor';

const { program } = require('commander');

module.exports = {
  run(defaultOption: AppOption) {
    program
      .option('-p, --port <port>', 'port of app')
      .option('-e, --env <env>', 'production or development')
      .action(() => {
        const options: AppOption = program.opts();
        const { port = defaultOption.port, env = defaultOption.env } = options;

        const server = createServer();

        server.listen(port, async () => {
          console.log(`i18n editor started with port ${port}`);

          await startResponse(server);
        });

        if (env === 'production') {
          UiExecutor.runHtmlUi(port);
        } else {
          startCheckMemoryInterval(TIME_UNIT.unitOfMs.asSecond * 30);
        }
      })
      .parse(process.argv);
  },
};

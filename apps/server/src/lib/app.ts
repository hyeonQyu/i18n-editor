import { TIME_UNIT } from 'i18n-editor-common';
import { AppOption } from './defines/appOption';
import { startCheckMemoryInterval } from './utils/memory';
import { startResponse } from './utils/response';
import { createServer } from './utils/server';
import { setEnvironment } from './utils/store';
import { openUI } from './utils/ui';

const { program } = require('commander');

module.exports = {
  run(defaultOption: AppOption) {
    program
      .option('-p, --port <port>', 'port of app')
      .option('-e, --env <env>', 'production or development')
      .action(() => {
        const options: AppOption = program.opts();
        const { port = defaultOption.port, env = defaultOption.env } = options;

        setEnvironment(env);

        const server = createServer();

        server.listen(port, async () => {
          console.log(`i18n editor started with port ${port}`);

          await startResponse(server);
        });

        if (env === 'production') {
          openUI(port);
        } else {
          startCheckMemoryInterval(TIME_UNIT.unitOfMs.asSecond * 30);
        }
      })
      .parse(process.argv);
  },
};

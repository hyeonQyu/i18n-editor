import { AppOption } from './defines/appOption';
import { UiExecutor } from './utils/uiExecutor';
import { Controller } from './apis/controller';
import { ConfigManager } from './utils/configManager';

const express = require('express');
const server = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { program } = require('commander');

module.exports = {
    run(defaultOption: AppOption) {
        program
            .option('-p, --port <port>', 'port of app')
            .option('-e, --env <env>', 'production or development')
            .action(() => {
                const options: AppOption = program.opts();
                const { port = defaultOption.port, env = defaultOption.env } = options;
                const limit = '1000mb';

                server.use(cors());
                server.use(bodyParser.json({ limit }));
                server.use(
                    bodyParser.urlencoded({
                        extended: true,
                        limit,
                    }),
                );

                server.listen(port, () => {
                    console.log(`locale json manager started with port ${port}`);
                });

                ConfigManager.init(env);
                Controller.response(server);

                if (env === 'production') {
                    UiExecutor.runHtmlUi(port);
                }
            })
            .parse(process.argv);
    },
};

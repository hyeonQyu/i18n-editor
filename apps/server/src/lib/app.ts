import { Express } from 'express';
import { Controller } from './apis/controller';
import ConfigController from './apis/controllers/ConfigController';
import { AppOption } from './defines/appOption';
import { ConfigUtil } from './utils/configUtil';
import { UiExecutor } from './utils/uiExecutor';

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
          console.log(`i18n editor started with port ${port}`);
          ConfigUtil.init(env);
          Controller.response(server);
        });

        if (env === 'production') {
          UiExecutor.runHtmlUi(port);
        }
      })
      .parse(process.argv);
  },
};

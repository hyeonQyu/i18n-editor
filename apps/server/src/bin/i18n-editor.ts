#!/usr/bin/env node

import { DefaultConfig } from 'i18n-editor-common';
import { Env } from '../lib/defines/appOption';

const app = require('../lib/app');
app.run({ port: DefaultConfig.PORT, env: (process.env.NODE_ENV ?? DefaultConfig.ENV) as Env });

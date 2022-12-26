#!/usr/bin/env node

import { DefaultConfig } from 'app-common';

const app = require('../lib/app');
app.run({ port: DefaultConfig.PORT, env: process.env.NODE_ENV ?? DefaultConfig.ENV });

#!/usr/bin/env node

import { DEFAULT_APP_CONFIG } from 'i18n-editor-common';

const app = require('../lib/app');
app.run({ port: DEFAULT_APP_CONFIG.port, env: process.env.NODE_ENV ?? 'production' });

import os from 'os';
import * as process from 'process';
import { Environment, OS } from '../defines/env';

export const getEnvironment = () => process.env.NODE_ENV as Environment;

export const getOS = () => os.platform().toLowerCase().replace(/[0-9]/g, '').replace('darwin', 'macos') as OS;

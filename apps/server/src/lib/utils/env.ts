import * as process from 'process';
import { Environment } from '../defines/env';

export const getEnvironment = () => process.env.NODE_ENV as Environment;

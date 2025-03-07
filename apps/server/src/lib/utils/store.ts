import { Environment } from '../defines/env';

const store: {
  env: Environment;
} = {
  env: 'development',
};

export const setEnvironment = (env: Environment) => {
  store.env = env;
};

export const getEnvironment = () => store.env;

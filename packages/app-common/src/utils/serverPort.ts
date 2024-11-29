import { DEFAULT_APP_CONFIG } from '../defines';

export const readServerPort = (): number => {
  const portValue = document.getElementById('port')?.getAttribute('value');
  return portValue ? Number(portValue) : DEFAULT_APP_CONFIG.port;
};

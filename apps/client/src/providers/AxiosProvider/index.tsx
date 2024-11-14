import axios, { AxiosInstance } from 'axios';
import { DEFAULT_APP_CONFIG, ResponseEntity } from 'i18n-editor-common';
import { readServerPort } from 'i18n-editor-common/lib/utils/serverPort';
import { identity } from 'lodash';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const createAxiosInstance = (port: number) => axios.create({ baseURL: `http://localhost:${port}/api` });
const defaultAxiosInstance = createAxiosInstance(DEFAULT_APP_CONFIG.port);

const AxiosContext = createContext<AxiosInstance>(defaultAxiosInstance);

export const useAxios = () => useContext(AxiosContext);

function AxiosProvider({ children }: { children: ReactNode }) {
  const [axiosInstance, setAxiosInstance] = useState<AxiosInstance>(() => defaultAxiosInstance);

  useEffect(() => {
    const port = readServerPort();
    const instance = createAxiosInstance(port);

    instance.interceptors.response.use(identity, (error) => {
      const { status, errorMessage } = error.response.data as ResponseEntity<any>;

      // TODO: Implement error handling
    });

    setAxiosInstance(() => axios.create({ baseURL: `http://localhost:${port}/api` }));
  }, []);

  return <AxiosContext.Provider value={axiosInstance}>{children}</AxiosContext.Provider>;
}

export default AxiosProvider;

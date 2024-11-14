import ConfigAPI from '@apis/config';
import FileSystemAPI from '@apis/file-system';
import NamespaceAPI from '@apis/namespace';
import axios, { AxiosInstance } from 'axios';
import { DEFAULT_APP_CONFIG, ResponseEntity } from 'i18n-editor-common';
import { readServerPort } from 'i18n-editor-common/lib/utils/serverPort';
import { identity } from 'lodash';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface API {
  config: ConfigAPI;
  fileSystem: FileSystemAPI;
  namespace: NamespaceAPI;
}

const createAxiosInstance = (port: number) => axios.create({ baseURL: `http://localhost:${port}/api` });
const defaultAxiosInstance = createAxiosInstance(DEFAULT_APP_CONFIG.port);

const createAPI = (axiosInstance: AxiosInstance): API => {
  return {
    config: new ConfigAPI(axiosInstance, '/config'),
    fileSystem: new FileSystemAPI(axiosInstance, '/file-system'),
    namespace: new NamespaceAPI(axiosInstance, '/namespace'),
  };
};
const defaultAPI = createAPI(defaultAxiosInstance);

const APIContext = createContext<API>(defaultAPI);

export const useAPI = () => useContext(APIContext);

function APIProvider({ children }: { children: ReactNode }) {
  const [api, setAPI] = useState<API>(() => defaultAPI);

  useEffect(() => {
    const port = readServerPort();
    const instance = createAxiosInstance(port);

    instance.interceptors.response.use(identity, (error) => {
      const { status, errorMessage } = error.response.data as ResponseEntity<any>;

      // TODO: Implement error handling
    });

    setAPI(() => createAPI(instance));
  }, []);

  return <APIContext.Provider value={api}>{children}</APIContext.Provider>;
}

export default APIProvider;

import axios, { AxiosInstance } from 'axios';

export namespace HomeApi {
  let client: AxiosInstance;

  export function setPort(port: number) {
    client = axios.create({ baseURL: `http://localhost:${port}/api` });
  }
}

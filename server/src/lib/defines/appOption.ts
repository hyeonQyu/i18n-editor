export interface AppOption {
    port: number;
    env: Env;
}

export type Env = 'production' | 'development';

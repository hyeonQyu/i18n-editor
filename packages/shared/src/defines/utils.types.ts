export interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

export type OS = 'win' | 'linux' | 'macos';

export type WithExtraArgs<TOriginal extends (...args: any) => any, TExtra extends any[]> = (
  ...args: [...TExtra, ...Parameters<TOriginal>]
) => ReturnType<TOriginal>;

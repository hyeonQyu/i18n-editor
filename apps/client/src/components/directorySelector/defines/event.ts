export type PathChangeEvent = {
  path: string;
};

export type DirectorySelectorEventHandler<E = undefined> = (e?: E) => void;

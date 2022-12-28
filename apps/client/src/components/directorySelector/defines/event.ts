export type PathChangeEvent = {
  path: string;
};

export type DirectorySelectorEventHandler<E> = (e?: E) => void;

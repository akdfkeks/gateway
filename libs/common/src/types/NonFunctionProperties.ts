type NonFuncionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
};

export type NonFunctionProperties<T> = Pick<T, NonFuncionPropertyNames<T>[keyof T]>;

export type AxiosResult<T> = {
  code: number;
  message: string;
  data: T;
};

export type TypeValue<T> = T[keyof T];

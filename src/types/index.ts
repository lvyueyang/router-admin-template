export type TypeValue<T> = T[keyof T];

export interface Userinfo {
  username: string;
  avatar: string;
}

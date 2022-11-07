//type 名字 就是类型别名
export type TokenRequest = {
  username: string;
  password: string;
};

export type ErrorResponse = {
  code: number;
  message: string;
};

export type UserType = {
  id: string;
  username: string;
  nickname: string;
  roles: Array<string>;
  permissions: Array<string>;
};

export interface Paging {
  page?: number;
  size?: number;
  total?: number;
}

export type ListResult<T> = {
  paging: Paging;
  data: Array<T>;
};

// 搜索关键词
export interface UserFilter extends Paging {
  name: string;
}

export interface Searchable<T> {
  list(filter: object): Promise<ListResult<T>>;
}

import { AIP_FIX } from '@/constants';
import { LoginBody, LoginResult, Result, UserInfo } from '../interface';
import request from '../request';

/** 登录 */
export const login = ({ user_name, password }: LoginBody) => {
  return request.post<Result<LoginResult>>(`${AIP_FIX}/user/login`, { user_name, password });
};

/** 获取当前登录用户信息 */
export const getUserInfo = () => {
  return request.get<Result<UserInfo>>(`${AIP_FIX}/user/AdminUserInfo`, { ignoreNotice: true });
};

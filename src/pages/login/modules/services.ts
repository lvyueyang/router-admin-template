import { UserAdminLoginBody, UserAdminLoginResponse } from '@/interface/serverApi';
import { AIP_FIX, request } from '@/request';

export const login = (body: UserAdminLoginBody) => {
  return request.post<UserAdminLoginResponse>(`${AIP_FIX}/login`, body);
};

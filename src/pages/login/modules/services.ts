import { ApiAdminUserLoginSuccessResponse } from '@/interface/serverApi';
import { AIP_FIX, Result, request } from '@/request';
import { LoginVo } from 'interface/serverApi';

export const login = (body: LoginVo) => {
  return request.post<Result<ApiAdminUserLoginSuccessResponse>>(`${AIP_FIX}/v1/login`, body);
};

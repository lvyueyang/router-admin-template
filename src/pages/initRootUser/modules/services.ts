import { AIP_FIX } from '@/constants';
import { UserAdminCreateRootDto } from '@/interface/serverApi';
import { Result, request } from '@/request';

export const initRootUser = (body: UserAdminCreateRootDto) => {
  return request.post<Result<number>>(`${AIP_FIX}/init-root-user-admin`, body);
};

import { AIP_FIX } from '@/constants';
import { CominfoDetailResponseDto, CominfoUpdateDto } from '@/interface/serverApi';
import request from '@/services/request';
import { Result } from '@/types';
import { COMINFO_TYPE_ENUM } from '@/constants';

/** 详情 */
export const getDetailApi = (type: COMINFO_TYPE_ENUM) => {
  return request.get<CominfoDetailResponseDto>(`${AIP_FIX}/cominfo/${type}`);
};

/** 修改 */
export const updateApi = (type: COMINFO_TYPE_ENUM, body: CominfoUpdateDto) => {
  return request.put<Result<string>>(`${AIP_FIX}/cominfo/${type}`, body);
};

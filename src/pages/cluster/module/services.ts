import { AIP_FIX } from '@/constants';
import { Result } from '@/types';
import { ClusterDetailResult, ClusterItemResult } from './types';
import request from '@/services/request';

/** 设备列表 */
export const getClusterList = (keywords = '') => {
  return request.post<Result<ClusterItemResult[]>>(`${AIP_FIX}/dashboard/GetClusterList`, {
    keywords,
  });
};

/** 详情 */
export const getClusterDetail = (ip: string) => {
  return request.post<Result<ClusterDetailResult>>(`${AIP_FIX}/dashboard/GetDeviceInfo`, {
    ip,
  });
};

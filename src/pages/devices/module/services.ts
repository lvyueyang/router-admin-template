import { AIP_FIX } from '@/constants';
import { ListResult, Result } from '@/types';
import { DeviceDetailResult, DeviceItemResult } from './types';
import request from '@/services/request';

/** 设备列表 */
export const getDevicesList = (keywords = '') => {
  return request.post<ListResult<DeviceItemResult>>(`${AIP_FIX}/dashboard/GetDeviceList`, {
    keywords,
  });
};

/** 详情 */
export const getDeviceDetail = (ip: string) => {
  return request.post<Result<DeviceDetailResult>>(`${AIP_FIX}/dashboard/GetDeviceInfo`, {
    ip,
  });
};

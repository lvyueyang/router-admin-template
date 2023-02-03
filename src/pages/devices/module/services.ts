import { AIP_FIX } from '@/constants';
import { ListResult, Result } from '@/types';
import { DeviceDetailResult, DeviceItemResult, ServiceItem } from './types';
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

/** 详情 */
export const runCmd = (mac_address: string, cmd: string) => {
  return request.post<Result<string>>(`${AIP_FIX}/dashboard/RunShellCmd`, {
    mac_address,
    cmd,
  });
};

/** 上传文件 */
export const uploadFile = (
  mac_address: string,
  path: string,
  file: Blob | File | string,
  onUploadProgress?: (p: ProgressEvent) => void,
) => {
  const formData = new FormData();
  formData.append('path', path);
  formData.append('mac_address', mac_address);
  formData.append('file', file);
  return request.post<Result<string>>(`${AIP_FIX}/dashboard/FileUploadDevice`, formData, {
    onUploadProgress,
  });
};

/** 服务列表 */
export const getServiceList = (mac_address: string) => {
  return request.post<Result<ServiceItem[]>>(`${AIP_FIX}/dashboard/GetServiceList`, {
    mac_address,
  });
};

/** 更新时钟 */
export const updateClock = (id: string, date: string) => {
  return request.post<Result<void>>(`${AIP_FIX}/dashboard/SetDeviceDate`, {
    id,
    date,
  });
};

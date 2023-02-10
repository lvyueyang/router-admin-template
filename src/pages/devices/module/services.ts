import { AIP_FIX } from '@/constants';
import { ListResult, Result } from '@/types';
import {
  DeviceDetailBaseInfo,
  DeviceDiskItemResult,
  DeviceItemResult,
  DeviceLogResult,
  ServiceItem,
  UpdateFileBody,
  UpdateIpGateWayBody,
} from './types';
import request from '@/services/request';
import { DEVICE_SERVICE_STATUS_ENUM } from './constants';

/** 设备列表 */
export const getDevicesList = (keywords = '') => {
  return request.post<ListResult<DeviceItemResult>>(`${AIP_FIX}/dashboard/GetDeviceList`, {
    keywords,
  });
};

/** 详情-指标数据 */
export const getDeviceBaseInfo = (mac_address: string) => {
  return request.post<Result<DeviceDetailBaseInfo>>(`${AIP_FIX}/dashboard/GetDeviceDetailData`, {
    mac_address,
  });
};

/** 详情-磁盘列表 */
export const getDeviceDiskList = (mac_address: string) => {
  return request.post<Result<DeviceDiskItemResult[]>>(
    `${AIP_FIX}/dashboard/GetDeviceDetailDiskList`,
    {
      mac_address,
    },
  );
};
/** 详情-日志*/
export const getDeviceLog = (mac_address: string) => {
  return request.post<Result<DeviceLogResult>>(`${AIP_FIX}/dashboard/GetDeviceDetailLog`, {
    mac_address,
  });
};

/** 执行命令 */
export const runCmd = (mac_address: string, cmd: string) => {
  return request.post<Result<string>>(`${AIP_FIX}/dashboard/RunShellCmd`, {
    mac_address,
    cmd,
  });
};

/** 上传文件 */
export const uploadFile = ({
  mac_address,
  path,
  file,
  update_type,
  onUploadProgress,
}: UpdateFileBody) => {
  const formData = new FormData();
  formData.append('path', path);
  formData.append('mac_address', mac_address);
  formData.append('update_type', update_type || '');
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

/** 获取下载文件地址 */
export const getDownloadFilePath = (mac_address: string, path: string) => {
  return request.post<Result<string>>(`${AIP_FIX}/dashboard/DownloadFile`, {
    mac_address,
    path,
  });
};

/** 重启设备 */
export const rebootDevice = (mac_address: string) => {
  return request.post<Result<void>>(`${AIP_FIX}/dashboard/RebootDevice`, {
    mac_address,
  });
};

/** 更改服务状态 */
export const updateServiceStatus = (
  mac_address: string,
  service_value: string,
  status: DEVICE_SERVICE_STATUS_ENUM,
) => {
  return request.post<Result<void>>(`${AIP_FIX}/dashboard/UpServiceStatus`, {
    mac_address,
    service_value,
    status,
  });
};

/** 升级 */
export const updateSystem = (mac_address: string) => {
  return request.post<Result<void>>(`${AIP_FIX}/dashboard/UpgradeSystem`, {
    mac_address,
  });
};

/** 修改IP和网关 */
export const updateIpGateWay = (body: UpdateIpGateWayBody) => {
  return request.post<Result<void>>(`${AIP_FIX}/dashboard/UpIpGateWay`, body);
};

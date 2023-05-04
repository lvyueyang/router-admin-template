import { AIP_FIX } from '@/constants';
import { ListResult, Result } from '@/types';
import {
  CreateSMBBody,
  DeviceDetailBaseInfo,
  DeviceDiskItemResult,
  DeviceItemResult,
  DeviceLogResult,
  DistAgingResult,
  IP,
  IPItemResult,
  RemoveSMBBody,
  ServiceItem,
  SMBItemResult,
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
export const getDeviceBaseInfo = (host_name: string) => {
  return request.post<Result<DeviceDetailBaseInfo>>(`${AIP_FIX}/dashboard/GetDeviceDetailData`, {
    host_name,
  });
};

/** 详情-磁盘列表 */
export const getDeviceDiskList = (host_name: string) => {
  return request.post<Result<DeviceDiskItemResult[]>>(
    `${AIP_FIX}/dashboard/GetDeviceDetailDiskList`,
    {
      host_name,
    },
  );
};
/** 详情-日志*/
export const getDeviceLog = (host_name: string) => {
  return request.post<Result<DeviceLogResult>>(`${AIP_FIX}/dashboard/GetDeviceDetailLog`, {
    host_name,
  });
};

/** 执行命令 */
export const runCmd = (host_name: string, cmd: string) => {
  return request.post<Result<string>>(`${AIP_FIX}/dashboard/RunShellCmd`, {
    host_name,
    cmd,
  });
};

/** 上传文件 */
export const uploadFile = ({
  host_name,
  path,
  file,
  update_type,
  onUploadProgress,
}: UpdateFileBody) => {
  const formData = new FormData();
  formData.append('path', path);
  formData.append('host_name', host_name);
  formData.append('update_type', update_type || '');
  formData.append('file', file);
  return request.post<Result<string>>(`${AIP_FIX}/dashboard/FileUploadDevice`, formData, {
    onUploadProgress,
  });
};

/** 服务列表 */
export const getServiceList = (host_name: string) => {
  return request.post<Result<ServiceItem[]>>(`${AIP_FIX}/dashboard/GetServiceList`, {
    host_name,
  });
};

/** 更新时钟 */
export const updateClock = (host_name: string, date: string) => {
  return request.post<Result<void>>(`${AIP_FIX}/dashboard/SetDeviceDate`, {
    host_name,
    date,
  });
};

/** 获取下载文件地址 */
export const getDownloadFilePath = (host_name: string, path: string) => {
  return request.post<Result<string>>(`${AIP_FIX}/dashboard/DownloadFile`, {
    host_name,
    path,
  });
};

/** 重启设备 */
export const rebootDevice = (host_name: string) => {
  return request.post<Result<void>>(`${AIP_FIX}/dashboard/RebootDevice`, {
    host_name,
  });
};

/** 更改服务状态 */
export const updateServiceStatus = (
  host_name: string,
  service_value: string,
  status: DEVICE_SERVICE_STATUS_ENUM,
) => {
  return request.post<Result<void>>(`${AIP_FIX}/dashboard/UpServiceStatus`, {
    host_name,
    service_value,
    status,
  });
};

/** 升级 */
export const updateSystem = (host_name: string) => {
  return request.post<Result<void>>(`${AIP_FIX}/dashboard/UpgradeSystem`, {
    host_name,
  });
};

/** 修改IP和网关 */
export const updateIpGateWay = (body: UpdateIpGateWayBody) => {
  return request.post<Result<void>>(`${AIP_FIX}/dashboard/UpIpGateWay`, body);
};

/** 硬盘重启休眠 */
export const updateDisk = (host_name: string, status: number, value?: number) => {
  return request.post<Result<void>>(`${AIP_FIX}/dashboard/UpDiskStatus`, {
    host_name,
    status,
    value,
  });
};

/** 系统初始化 */
export const systemInit = (host_name: string) => {
  return request.post<Result<void>>(`${AIP_FIX}/dashboard/SystemInit`, {
    host_name,
  });
};

/** 系统格式化 */
export const systemFs = (host_name: string) => {
  return request.post<Result<void>>(`${AIP_FIX}/dashboard/SystemFs`, {
    host_name,
  });
};

/** 硬盘老化 */
export const diskAging = (host_name: string) => {
  return request.post<Result<void>>(`${AIP_FIX}/tools/DiskAging`, {
    host_name,
  });
};

/** 硬盘老化信息 */
export const getDiskAgingInfo = (host_name: string) => {
  return request.post<Result<DistAgingResult>>(`${AIP_FIX}/tools/DiskAgingInfo`, {
    host_name,
  });
};

/** SMB列表 */
export const getSMBList = (host_name: string) => {
  return request.post<Result<SMBItemResult[]>>(`${AIP_FIX}/tools/GetSmbUserList`, {
    host_name,
  });
};

/** 添加 SMB 用户 */
export const createSMBUser = (body: CreateSMBBody) => {
  return request.post<Result<void>>(`${AIP_FIX}/tools/AddSmbUser`, body);
};

/** 删除 SMB 用户 */
export const removeSMBUser = (body: RemoveSMBBody) => {
  return request.post<Result<void>>(`${AIP_FIX}/tools/DelSmbUser`, body);
};

/** 修改 SMB 用户密码 */
export const updatePasswordSMBUser = (body: CreateSMBBody) => {
  return request.post<Result<void>>(`${AIP_FIX}/tools/UpSmbUserPassword`, body);
};

/** IP 列表 */
export const getIpList = () => {
  return request.get<Result<IPItemResult[]>>(`${AIP_FIX}/tools/GetLocalIpList`);
};

/** 获取已选中的 IP 配置 */
export const getIpConfig = () => {
  return request.get<Result<IP[]>>(`${AIP_FIX}/tools/GetPingLocalIpConfig`);
};

/** 保存选中的 IP 配置 */
export const saveIpConfig = (ip_list: IP[]) => {
  return request.post<Result<void>>(`${AIP_FIX}/tools/SetPingLocalIpConfig`, { ip_list });
};

/** 执行探测 */
export const runDevicePing = () => {
  return request.post<Result<void>>(`${AIP_FIX}/tools/PingDeviceIpStr`);
};

/** 执行 raid 操作 */
export const runRaid = (host_name: string) => {
  return request.post<Result<void>>(`${AIP_FIX}/tools/RunRaid`, { host_name });
};

import { AIP_FIX } from '@/constants';
import { Result } from '@/types';
import { ClusterDetailResult, ClusterItemResult, CreateClusterBody, DeviceItem } from './types';
import request from '@/services/request';

/** 集群列表 */
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

/** 创建集群 */
export const createCluster = (body: CreateClusterBody) => {
  return request.post<void>(`${AIP_FIX}/dashboard/SetClusterInfo`, body);
};

/** 修改集群 */
export const updateCluster = (body: CreateClusterBody & { id: string }) => {
  return request.post<void>(`${AIP_FIX}/dashboard/UpdateClusterInfo`, body);
};

/** 删除集群 */
export const deleteCluster = (id: string) => {
  return request.post<void>(`${AIP_FIX}/dashboard/RemoveClusterInfo`, { id });
};

/** 获取未绑定集群的设备 */
export const getDevicesList = () => {
  return request.get<Result<DeviceItem[]>>(`${AIP_FIX}/dashboard/GetNoBindClusterDeviceList`);
};

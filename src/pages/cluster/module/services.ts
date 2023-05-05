import { AIP_FIX, CLUSTER_TYPE_ENUM } from '@/constants';
import { Result } from '@/types';
import {
  ClusterDetailResult,
  ClusterItemResult,
  CreateClusterBody,
  DeviceItem,
  UpdateECConfigBody,
} from './types';
import request from '@/services/request';

/** 集群列表 */
export const getClusterList = (keywords = '') => {
  return request.post<Result<ClusterItemResult[]>>(`${AIP_FIX}/dashboard/GetClusterList`, {
    keywords,
  });
};

/** 详情 */
export const getClusterDetail = (cluster_id: string) => {
  return request.post<Result<ClusterDetailResult>>(`${AIP_FIX}/dashboard/ClusterInfoDetail`, {
    cluster_id,
  });
};

/** 日志详情 */
export const getClusterLogger = (cluster_id: string) => {
  return request.post<Result<string>>(`${AIP_FIX}/dashboard/GetClusterLog`, {
    cluster_id,
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
export const getDevicesList = (cluster_type: CLUSTER_TYPE_ENUM) => {
  return request.post<Result<DeviceItem[]>>(`${AIP_FIX}/dashboard/GetNoBindClusterDeviceList`, {
    cluster_type,
  });
};

/** 更新EC参数 */
export const updateECConfig = (body: UpdateECConfigBody) => {
  return request.post<void>(`${AIP_FIX}/dashboard/UpEcData`, body);
};

/** 重启 */
export const restartCluster = (cluster_id: string) => {
  return request.post<void>(`${AIP_FIX}/dashboard/RestartCluster`, { cluster_id });
};

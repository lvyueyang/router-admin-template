import { CLUSTER_TYPE_ENUM } from '@/constants';

export interface ClusterItemResult {
  id: string;
  name: string;
  device_list: string[];
  status: boolean;
  cluster_type: CLUSTER_TYPE_ENUM;
  /** 是否raid */
  raid_status: boolean;
}

export interface ClusterDetailResult {
  id: string;
  name: string;
  status: boolean;
  raid_status: boolean;
  capacity: string;
  cluster_type: string;
  device_list: string[];
  cluster_id: string;
  EC_MINIO_ACCESS_KEY: string;
  EC_MINIO_SECRET_KEY: string;
  EC_HOME: string;
  EC_MINIO_STORAGE_CLASS_STANDARD: string;
  EC_MINIO_STORAGE_CLASS_RRS: string;
  // EC_RUN_CMD: string;
}

export interface CreateClusterBody {
  name: string;
  device_list: string[];
  cluster_type: CLUSTER_TYPE_ENUM;
  /** 冗余盘数 */
  redundancy_count?: number;
  /** 是否raid */
  raid_status: boolean;
}

export interface DeviceItem {
  host_name: string;
  ip: string;
  mac_add_str: string;
}

export interface UpdateECConfigBody {
  cluster_id: string;
  EC_MINIO_ACCESS_KEY: string;
  EC_MINIO_SECRET_KEY: string;
  // EC_HOME: string;
  EC_MINIO_STORAGE_CLASS_STANDARD: string;
  EC_MINIO_STORAGE_CLASS_RRS: string;
  // EC_RUN_CMD: string;
}

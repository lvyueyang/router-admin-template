import { CLUSTER_TYPE_ENUM } from '@/constants';

export interface ClusterItemResult {
  id: string;
  name: string;
  device_list: string[];
  status: boolean;
  cluster_url: string;
  cluster_type: CLUSTER_TYPE_ENUM;
}

interface Disk {
  hard_disk_name: string;
  hard_disk_status: string;
  hard_disk_heat: number;
}

export interface ClusterDetailResult {
  id: string;
  name: string;
  status: boolean;
  capacity: string;
  cluster_type: string;
  cluster_url: string;
  device_list: string[];
  cluster_id: string;
  EC_MINIO_ACCESS_KEY: string;
  EC_MINIO_SECRET_KEY: string;
  EC_HOME: string;
  EC_MINIO_STORAGE_CLASS_STANDARD: string;
  EC_MINIO_STORAGE_CLASS_RRS: string;
  EC_RUN_CMD: string;
}

export interface CreateClusterBody {
  name: string;
  device_list: string[];
  cluster_url: string;
  cluster_type: CLUSTER_TYPE_ENUM;
  /** 冗余盘数 */
  redundancy_count?: number;
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
  EC_HOME: string;
  EC_MINIO_STORAGE_CLASS_STANDARD: string;
  EC_MINIO_STORAGE_CLASS_RRS: string;
  EC_RUN_CMD: string;
}

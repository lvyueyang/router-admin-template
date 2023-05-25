import { RAID_STATUS_ENUM } from './constants';

export interface DeviceItemResult {
  /** 设备ip */
  ip: string;
  /** 主机名称 */
  host_name: string;
  /** MAC地址 */
  mac_add_str: string;
  /** 操作系统 */
  system_info: string;
  /** 网络状态 true 正常 false 异常 */
  network_status: boolean;
  /** 服务状态 true 正常 false 异常 */
  service_status: boolean;
}

export interface RaidInfoResult {
  raid_info: string; //raid过程中的信息
  ip: string; //ip
  raid_status: RAID_STATUS_ENUM; //0.未raid 2.raid成功 3.raid失败
}

export interface DeviceDetailBaseInfo {
  ip: string; //设备ip
  gateway_ip: string; //网关地址
  mac_add_str: string; //mac地址
  cpu_use_rate: number; //cpu使用率
  cpu_tem: string; //CPU温度
  memory_use_rate: number; //内存使用率
  electric_current: number; //电流
  voltage: number; //电压
  power: number; //功率
  temperature: number; //主板温度
  current_system_version: string; //备用系统信息
  system_version: string; //系统运行版本号
  system_partition: string; //当前系统分区
  system_disk_use: string; //系统使用量
  time_string: string; //时钟
  system_running_time: string; // 运行时常
}

export interface DeviceDiskItemResult {
  hard_disk_name: string; //路径
  hard_disk_status: string; //状态
  hard_disk_heat: string; //温度
  hard_disk_error_log: string; //错误日志
}

export interface DeviceLogResult {
  log_dmesg: string; //内核日志
  system_log: string; //系统日志
  service_glusterd: string; // glusterd
  service_minio_log: string; // minio
}

export interface ServiceItem {
  /** 服务名称 */
  service_name: string;
  /** 服务编号 */
  service_value: string;
  /** 状态 */
  status: string;
  /** 状态颜色 */
  color: string;
}

export interface UpdateIpGateWayBody {
  host_name: string; //mac地址
  new_ip: string; //新ip
  new_gateway: string; //新网关
}

export interface UpdateFileBody {
  host_name: string;
  path: string;
  file: Blob | File | string;
  update_type?: 'upgrade_system';
  onUploadProgress?: (p: ProgressEvent) => void;
}

export interface DistAgingResult {
  /** 是否正在进行老化 */
  disk_aging: boolean;
  /** 最近一次老化开始时间 */
  disk_aging_last_start_time: string;
  /** 最近一次老化结束时间 */
  disk_aging_last_end_time: string;
  /** 最近一次老化是否成功 */
  disk_aging_last_value_status: boolean;
  /** /最近一次老化结果 */
  disk_aging_last_value_str: string;
}

export interface SMBItemResult {
  user_name: string; //用户名
}

export interface CreateSMBBody {
  mac_address: string;
  user_name: string; //用户名
  password: string; //密码
}

export interface RemoveSMBBody {
  mac_address: string;
  user_name: string; //用户名
}

/** IP 地址 */
export type IP = string;

export interface IPItemResult {
  ip: IP;
  name: string;
}

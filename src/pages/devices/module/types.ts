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

interface Disk {
  hard_disk_name: string;
  hard_disk_status: string;
  hard_disk_heat: number;
}

export interface DeviceDetailResult {
  host_name: string;
  ip: string;
  ip_str: string;
  status: boolean;
  system_info: string;
  cpu_use_rate: number;
  cpu_temperature: number;
  main_board_temperature: number;
  memory_usage_rate: number;
  voltage: number;
  system_running_time: number;
  system_version: string;
  system_partition: string;
  on_off_status: boolean;
  gateway_ip: string;
  disk_list: Disk[];
  service_status: boolean;
  time_string: string;
  system_disk_use: number;
  power: number;
  electric_current: number;
  /** 内核日志 */
  log_dmesg: string;
  /** 系统日志 */
  system_log: string;
}

export interface ServiceItem {
  /** 服务名称 */
  service_name: string;
  /** 状态 */
  status: boolean;
}

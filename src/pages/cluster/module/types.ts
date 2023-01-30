export interface ClusterItemResult {
  id: string;
  name: string;
  device_list: string[];
  status: boolean;
}

interface Disk {
  hard_disk_name: string;
  hard_disk_status: string;
  hard_disk_heat: number;
}

export interface ClusterDetailResult {
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
}

export interface CreateClusterBody {
  name: string;
  device_list: string[];
}

export interface DeviceItem {
  host_name: string;
  ip: string;
  mac_add_str: string;
}

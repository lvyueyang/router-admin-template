import { Select, SelectProps } from 'antd';
import { useEffect, useState } from 'react';
import { getDevicesList } from './services';
import { DeviceItem } from './types';

export function SelectDevices(props: SelectProps) {
  const [options, setOptions] = useState<DeviceItem[]>([]);

  useEffect(() => {
    getDevicesList().then((res) => {
      console.log(res);
      setOptions(res.data.data);
    });
  }, []);
  return (
    <Select
      {...props}
      mode="multiple"
      options={options?.map((item) => ({ value: item.mac_add_str, label: item.host_name }))}
    />
  );
}

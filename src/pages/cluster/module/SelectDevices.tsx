import { Row, Select, SelectProps, Tag, Tooltip } from 'antd';
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
      tagRender={(props) => {
        const current = options.find((item) => item.mac_add_str === props.value);
        return (
          <Tooltip title={current?.ip}>
            <Tag closable onClose={props.onClose}>
              {current?.host_name || props.value}
            </Tag>
          </Tooltip>
        );
      }}
    >
      {options?.map((item) => {
        return (
          <Select.Option value={item.mac_add_str} key={item.mac_add_str} label={item.host_name}>
            <Row justify="space-between">
              <b>{item.host_name}</b>
              <span>{item.ip}</span>
            </Row>
          </Select.Option>
        );
      })}
    </Select>
  );
}

import { Row, Select, SelectProps, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { getDevicesList } from './services';
import { DeviceItem } from './types';
import { CLUSTER_TYPE_ENUM } from '@/constants';
interface SelectDevicesProps extends SelectProps {
  clusterType: CLUSTER_TYPE_ENUM;
}

export function SelectDevices({ clusterType, ...props }: SelectDevicesProps) {
  const [options, setOptions] = useState<DeviceItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!clusterType) return;
    setLoading(true);
    getDevicesList(clusterType)
      .then((res) => {
        console.log(res);
        setOptions(res.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [clusterType]);
  return (
    <Select
      {...props}
      placeholder={loading ? '加载中...' : props.placeholder}
      mode="multiple"
      loading={loading}
      tagRender={(props) => {
        const current = options.find((item) => item.mac_add_str === props.value);
        return (
          <Tooltip title={current?.ip}>
            <Tag closable onClose={props.onClose} style={{ margin: 4 }}>
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

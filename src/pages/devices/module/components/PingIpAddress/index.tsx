import { useRequest } from 'ahooks';
import { Button, Select, Space } from 'antd';
import { getIpConfig, getIpList, runDevicePing, saveIpConfig } from '../../services';
import { useEffect, useState } from 'react';
import { IP } from '../../types';

interface PingIpAddressProps {
  onComplete?: (err?: any) => void;
}

export function PingIpAddress({ onComplete }: PingIpAddressProps) {
  const [runLoading, setRunLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const { data: ipList } = useRequest(() => {
    return getIpList().then((res) => res.data.data);
  });
  const [selectedIp, setSelectedIp] = useState<IP[]>([]);

  const saveHandler = (list: IP[]) => {
    setSaveLoading(true);
    saveIpConfig(list).finally(() => {
      setSaveLoading(false);
    });
  };

  const runHandler = () => {
    setRunLoading(true);
    runDevicePing()
      .then(() => {
        onComplete?.();
      })
      .catch((e) => {
        onComplete?.(e);
      })
      .finally(() => {
        setRunLoading(false);
      });
  };

  const getSelectedIP = () => {
    getIpConfig().then((res) => {
      setSelectedIp(res.data.data || []);
    });
  };

  useEffect(() => {
    getSelectedIP();
  }, []);

  return (
    <Space>
      <Select
        mode="multiple"
        value={selectedIp}
        style={{ minWidth: 100 }}
        options={ipList?.map((item) => ({ value: item.ip, label: `${item.name} (${item.ip})` }))}
        loading={saveLoading}
        placeholder="请选择 IP"
        disabled={runLoading}
        onChange={(e) => {
          setSelectedIp(e);
          saveHandler(e);
        }}
      />
      <Button
        type="primary"
        disabled={selectedIp.length === 0}
        loading={runLoading}
        onClick={runHandler}
      >
        发现新设备{runLoading && '中...'}
      </Button>
    </Space>
  );
}

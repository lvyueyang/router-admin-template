import ProCard from '@ant-design/pro-card';
import { Button, Col } from 'antd';
import { getDeviceLog } from '../services';
import { useDeviceInfo } from '../hooks/useDeviceInfo';
import { cardProps, colSpan } from '../constants';
import { useRequest } from 'ahooks';
import LogView from '@/components/LogView';

export default function LogInfo() {
  const { id } = useDeviceInfo();
  const { data, loading, run } = useRequest(() => {
    return getDeviceLog(id).then((res) => res.data.data);
  });

  return (
    <>
      <Col {...colSpan} lg={24}>
        <ProCard
          {...cardProps}
          title="内核日志"
          collapsible
          loading={loading}
          extra={
            <Button
              ghost
              type="primary"
              onClick={(e) => {
                e.stopPropagation();
                run();
              }}
            >
              刷新
            </Button>
          }
        >
          <LogView value={data?.log_dmesg} />
        </ProCard>
      </Col>
      <Col {...colSpan} lg={24}>
        <ProCard
          {...cardProps}
          title="系统日志"
          collapsible
          loading={loading}
          extra={
            <Button
              ghost
              type="primary"
              onClick={(e) => {
                e.stopPropagation();
                run();
              }}
            >
              刷新
            </Button>
          }
        >
          <LogView value={data?.system_log} />
        </ProCard>
      </Col>
    </>
  );
}

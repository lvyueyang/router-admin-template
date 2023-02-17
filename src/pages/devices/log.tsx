import Header from '@/components/Header';
import { ProCard, ProCardProps } from '@ant-design/pro-components';
import { Button, Row, Col } from 'antd';
import { getDeviceLog } from './module';
import { useParams } from 'umi';
import styles from './index.module.less';
import { useRequest } from 'ahooks';
import LogView from '@/components/LogView';

const colSpan = { md: 24, lg: 12 };
const cardProps: ProCardProps = {
  type: 'inner',
  size: 'small',
  bordered: true,
  className: styles.card,
};

export default function DeviceDetailPage() {
  const { id } = useParams();
  const { data, loading, run } = useRequest(() => {
    return getDeviceLog(id!).then((res) => res.data.data);
  });

  return (
    <>
      <Header title="设备日志">
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
      </Header>
      <Row gutter={[16, 16]} style={{ maxWidth: 1200 }}>
        <Col {...colSpan} lg={24}>
          <ProCard {...cardProps} title="内核日志" collapsible loading={loading}>
            <LogView value={data?.log_dmesg} />
          </ProCard>
        </Col>
        <Col {...colSpan} lg={24}>
          <ProCard {...cardProps} title="系统日志" collapsible loading={loading}>
            <LogView value={data?.system_log} />
          </ProCard>
        </Col>
        <Col {...colSpan} lg={24}>
          <ProCard {...cardProps} title="minio" collapsible loading={loading}>
            <LogView value={data?.service_minio_log} />
          </ProCard>
        </Col>
        <Col {...colSpan} lg={24}>
          <ProCard {...cardProps} title="glusterd" collapsible loading={loading}>
            <LogView value={data?.service_glusterd} />
          </ProCard>
        </Col>
      </Row>
    </>
  );
}

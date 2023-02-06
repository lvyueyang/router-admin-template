import Header from '@/components/Header';
import { ProCard, ProCardProps } from '@ant-design/pro-components';
import { Button, Col, List, message, Popconfirm, Row, Space, Statistic } from 'antd';
import { getClusterDetail, restartCluster, UpdateECConfig } from './module';
import styles from './index.module.less';
import { useThemeToken } from '@/hooks/useThemeToken';
import { useRequest } from 'ahooks';
import { Link, useParams } from 'umi';
import { CLUSTER_TYPE } from '@/constants';
import { SSLCard } from './module/SSLCard';

const cardProps: ProCardProps = {
  type: 'inner',
  size: 'small',
  bordered: true,
  className: styles.card,
};

export default function ClusterDetailPage() {
  const { id } = useParams();
  const { data, run } = useRequest(() => {
    return getClusterDetail(id!).then((res) => res.data.data);
  });
  const { colorSuccess, colorError } = useThemeToken();

  if (!data) return null;

  return (
    <>
      <Header title={data.name}>
        <Space>
          <Popconfirm
            title="您确定要重启这个集群吗？"
            onConfirm={() => {
              const close = message.loading('集群重启中', 0);
              restartCluster(data.id)
                .then(() => {
                  message.success('重启成功');
                  run();
                })
                .finally(() => {
                  close();
                });
            }}
          >
            <Button type="primary" danger ghost>
              重启
            </Button>
          </Popconfirm>
        </Space>
      </Header>
      <Row gutter={[16, 16]} style={{ maxWidth: 1200 }}>
        <Col lg={24} md={24}>
          <ProCard {...cardProps}>
            <ProCard>
              <Statistic
                title="集群状态"
                value={data.status ? '在线' : '离线'}
                valueStyle={{ color: data.status ? colorSuccess : colorError }}
              />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic title="容量" value={data.capacity || '-'} />
            </ProCard>
          </ProCard>
        </Col>
        {data.cluster_type === CLUSTER_TYPE.MINIO.id && (
          <Col md={24}>
            <ProCard {...cardProps} title="EC 参数修改">
              <UpdateECConfig data={data} onComplete={run} />
            </ProCard>
          </Col>
        )}
        <Col md={24}>
          <ProCard {...cardProps} title="设备列表">
            <List
              dataSource={data.device_list}
              renderItem={(item) => {
                return (
                  <List.Item extra={<Link to={`/devices/${item}`}>查看</Link>}>{item}</List.Item>
                );
              }}
            ></List>
          </ProCard>
        </Col>
        {/* <Col lg={12} md={24}>
          <ProCard {...cardProps} title="磁盘加密">
            <Statistic title="当前状态" value={'正常'} valueStyle={{ color: colorSuccess }} />
          </ProCard>
        </Col> */}
        {data.cluster_type === CLUSTER_TYPE.GLUSTERD.id && (
          <Col md={24}>
            <ProCard {...cardProps} title="SSL 加密" extra={<SSLCard data={data} />}>
              <Statistic title="当前状态" value={'正常'} valueStyle={{ color: colorSuccess }} />
            </ProCard>
          </Col>
        )}
      </Row>
    </>
  );
}

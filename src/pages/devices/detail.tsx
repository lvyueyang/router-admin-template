import Header from '@/components/Header';
import { ProCard, ProCardProps } from '@ant-design/pro-components';
import { Button, Dropdown, Row, Col, Space, Statistic, Tag, Tooltip, message } from 'antd';
import { ArrowUpOutlined, DownOutlined, PoweroffOutlined, SyncOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { getDeviceDetail } from './module';
import { useParams } from 'umi';
import styles from './index.module.less';
import { useRequest } from 'ahooks';
import { useThemeToken } from '@/hooks/useThemeToken';
import PollingSelect, { usePollingInterval } from '@/components/PollingSelect';

const colSpan = { md: 24, lg: 12 };

export default function DeviceDetailPage() {
  const { id } = useParams();
  const pollingInterval = usePollingInterval();
  const { colorSuccess, colorError } = useThemeToken();
  const {
    data: info,
    loading,
    runAsync,
  } = useRequest(
    () => {
      return getDeviceDetail(id!).then((res) => {
        return res.data.data;
      });
    },
    {
      manual: true,
      pollingInterval,
    },
  );
  useEffect(() => {
    runAsync();
  }, [id]);
  const cardProps: ProCardProps = {
    type: 'inner',
    size: 'small',
    bordered: true,
    className: styles.card,
  };
  return (
    <>
      <Header title="设备详情">
        <Space>
          <PollingSelect />
          <Tooltip title="刷新">
            <Button
              type="primary"
              ghost
              icon={<SyncOutlined />}
              loading={loading}
              onClick={() => {
                runAsync().then(() => {
                  message.success('刷新完成');
                });
              }}
            >
              刷新
            </Button>
          </Tooltip>
        </Space>
      </Header>
      <Row gutter={[16, 16]} style={{ maxWidth: 1200 }}>
        {/* 主机信息 */}
        <Col {...colSpan}>
          <ProCard {...cardProps} title="主机信息">
            <ProCard>
              <Statistic title="CPU 占用" value={info?.cpu_use_rate} suffix={<small>%</small>} />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic title="CPU 温度" value={info?.cpu_temperature} suffix={<small>℃</small>} />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic title="内存" value={info?.memory_usage_rate} suffix={<small>%</small>} />
            </ProCard>
          </ProCard>
        </Col>
        {/* 操作系统 */}
        <Col {...colSpan}>
          <ProCard
            {...cardProps}
            title="操作系统"
            extra={
              <Space>
                <Tooltip title="升级">
                  <Button type="primary" danger ghost icon={<ArrowUpOutlined />}>
                    升级
                  </Button>
                </Tooltip>
                <Tooltip title="重启">
                  <Button type="primary" ghost icon={<PoweroffOutlined />}>
                    重启
                  </Button>
                </Tooltip>
              </Space>
            }
          >
            <ProCard>
              <Statistic
                title="运行时长"
                value={info?.system_running_time}
                suffix={<small>小时</small>}
              />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic title="版本号" value={info?.system_version || '-'} />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic title="运行系统的分区" value={info?.system_partition || '-'} />
            </ProCard>
          </ProCard>
        </Col>
        {/* 服务进程与时钟 */}
        <Col {...colSpan}>
          <ProCard
            {...cardProps}
            title="服务进程与时钟"
            extra={
              <Space>
                <Dropdown
                  menu={{
                    items: [
                      { label: '启动', key: '1' },
                      { label: '停止', key: '2' },
                      { label: '重启', key: '3' },
                    ],
                  }}
                >
                  <Button type="primary" ghost>
                    服务操作 <DownOutlined />
                  </Button>
                </Dropdown>
                <Button type="primary" ghost>
                  修改时钟
                </Button>
              </Space>
            }
          >
            <ProCard>
              <Statistic
                title="服务状态"
                value={info?.service_status ? '在线' : '离线'}
                valueStyle={{ color: info?.service_status ? colorSuccess : colorError }}
              />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic title="时钟" value={info?.time_string || '-'} />
            </ProCard>
          </ProCard>
        </Col>
        {/* 网络 */}
        <Col {...colSpan}>
          <ProCard {...cardProps} title="网络">
            <ProCard>
              <Statistic
                title="通断状态"
                value={info?.on_off_status ? '已连接' : '已断开'}
                valueStyle={{ color: info?.on_off_status ? colorSuccess : colorError }}
              />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic title="IP 地址" value={info?.ip} />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic title="网关地址" value={info?.gateway_ip || '-'} />
            </ProCard>
          </ProCard>
        </Col>
        {/* 硬盘 */}
        {info?.disk_list?.map((disk) => {
          return (
            <Col {...colSpan} lg={24} key={disk.hard_disk_name}>
              <ProCard
                {...cardProps}
                title={
                  <Space>
                    <span>硬盘</span>
                    <Tag color="blue">{disk.hard_disk_name}</Tag>
                    <Tag>
                      {disk.hard_disk_heat}
                      <small> ℃</small>
                    </Tag>
                    <Tag color="red">{disk.hard_disk_status}</Tag>
                  </Space>
                }
                extra={
                  <Space>
                    <Tooltip title="智能预测">
                      <Button type="primary" ghost>
                        智能预测
                      </Button>
                    </Tooltip>
                    <Tooltip title="备份扇区">
                      <Button type="primary" ghost>
                        备份扇区
                      </Button>
                    </Tooltip>
                    <Tooltip title="格式化 (ext4)">
                      <Button type="primary" danger ghost>
                        格式化 (ext4)
                      </Button>
                    </Tooltip>
                  </Space>
                }
              >
                <Row justify="center">错误日志信息</Row>
              </ProCard>
            </Col>
          );
        })}

        {/* 上传/下载文件 */}
        <Col {...colSpan} lg={24}>
          <ProCard {...cardProps} title="上传/下载文件"></ProCard>
        </Col>
      </Row>
    </>
  );
}

import Header from '@/components/Header';
import { ProCard, ProCardProps } from '@ant-design/pro-components';
import {
  Button,
  Row,
  Col,
  Space,
  Statistic,
  Tag,
  Tooltip,
  message,
  Input,
  DatePicker,
  Popconfirm,
} from 'antd';
import {
  ArrowUpOutlined,
  DownloadOutlined,
  PoweroffOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import {
  CmdInput,
  getDeviceDetail,
  getDownloadFilePath,
  rebootDevice,
  updateClock,
} from './module';
import { useParams } from 'umi';
import dayjs from 'dayjs';
import styles from './index.module.less';
import { useRequest } from 'ahooks';
import { useThemeToken } from '@/hooks/useThemeToken';
import PollingSelect, { usePollingInterval } from '@/components/PollingSelect';
import { DragUpload } from './module/components/DragUpload';
import { ServiceList } from './module/components/ServiceList';
import { downloadFile } from '@/utils';

const colSpan = { md: 24, lg: 12 };

export default function DeviceDetailPage() {
  const [customPath, setCustomPath] = useState('');
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
        {/* 操作系统 */}
        <Col {...colSpan} lg={24}>
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
                <Popconfirm
                  title="确定要重启吗？"
                  onConfirm={() => {
                    const close = message.loading('重启中...', 0);
                    rebootDevice(id!)
                      .then(() => {
                        message.success('重启成功');
                        runAsync();
                      })
                      .finally(() => {
                        close();
                      });
                  }}
                >
                  <Button type="primary" ghost icon={<PoweroffOutlined />}>
                    重启
                  </Button>
                </Popconfirm>
                <Tooltip title="下载证书">
                  <Button
                    type="primary"
                    ghost
                    icon={<DownloadOutlined />}
                    onClick={() => {
                      getDownloadFilePath(id!, '/etc/ssl/glusterfs.pem').then((res) => {
                        const p = res.data.data;
                        let url = p;
                        if (process.env.NODE_ENV === 'development') {
                          url = `http://192.168.31.16:8085/${p}`;
                        }
                        downloadFile(url, 'glusterfs.pem');
                      });
                      getDownloadFilePath(id!, '/etc/ssl/glusterfs.key').then((res) => {
                        const p = res.data.data;
                        let url = p;
                        if (process.env.NODE_ENV === 'development') {
                          url = `http://192.168.31.16:8085/${p}`;
                        }
                        downloadFile(url, 'glusterfs.key');
                      });
                      getDownloadFilePath(id!, '/etc/ssl/glusterfs.ca').then((res) => {
                        const p = res.data.data;
                        let url = p;
                        if (process.env.NODE_ENV === 'development') {
                          url = `http://192.168.31.16:8085/${p}`;
                        }
                        downloadFile(url, 'glusterfs.ca');
                      });
                    }}
                  >
                    下载证书
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
              <Statistic
                title="版本号"
                value={info?.system_version || '-'}
                valueStyle={{ fontSize: 18 }}
              />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic
                title="运行系统的分区"
                value={info?.system_partition || '-'}
                valueStyle={{ fontSize: 18 }}
              />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic title="系统盘容量" value={'10/100'} valueStyle={{ fontSize: 18 }} />
            </ProCard>
          </ProCard>
        </Col>
        {/* 服务进程 */}
        <ServiceList id={id} />
        {/* 时钟 */}
        <Col {...colSpan} lg={24}>
          <ProCard
            {...cardProps}
            title="时钟"
            extra={
              <Space>
                <div className={styles.updateClock}>
                  <Button type="primary" ghost>
                    修改时钟
                  </Button>
                  <DatePicker
                    showTime
                    className={styles.clockInput}
                    value={dayjs(info?.time_string)}
                    onChange={(e) => {
                      updateClock(id!, e!.format('YYYY-MM-DD HH:mm:ss')).then(() => {
                        message.success('更新完成');
                        runAsync();
                      });
                    }}
                  />
                </div>
              </Space>
            }
          >
            <ProCard>
              <Tooltip title={info?.time_string} placement="topLeft">
                <Statistic title="" value={info?.time_string ? info?.time_string : '-'} />
              </Tooltip>
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
                    {/* <Tooltip title="智能预测">
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
                    </Tooltip> */}
                  </Space>
                }
              >
                <Row justify="center">错误日志信息</Row>
              </ProCard>
            </Col>
          );
        })}

        {/* 上传 */}
        <Col {...colSpan} lg={24}>
          <ProCard {...cardProps} title="上传系统镜像文件">
            <DragUpload id={id!} path="/opt" desc="请上传符合要求的系统镜像文件" />
          </ProCard>
        </Col>
        {/* 自定义上传文件 */}
        <Col {...colSpan} lg={24}>
          <ProCard
            {...cardProps}
            title={
              <Space>
                <span>自定义上传文件</span>
                <Input
                  style={{ width: 300 }}
                  placeholder="请输入要上传的目标路径"
                  value={customPath}
                  onChange={(e) => {
                    setCustomPath(e.target.value.trim());
                  }}
                />
              </Space>
            }
          >
            <DragUpload id={id!} path={customPath} />
          </ProCard>
        </Col>
        <Col {...colSpan} lg={24}>
          <CmdInput id={id!} />
        </Col>
        <Col {...colSpan} lg={24}>
          <ProCard {...cardProps} title="内核日志" collapsible>
            <ProCard>
              <code dangerouslySetInnerHTML={{ __html: info?.log_dmesg || '' }}></code>
            </ProCard>
          </ProCard>
        </Col>
        <Col {...colSpan} lg={24}>
          <ProCard {...cardProps} title="系统日志" collapsible>
            <ProCard>
              <code dangerouslySetInnerHTML={{ __html: info?.system_log || '' }}></code>
            </ProCard>
          </ProCard>
        </Col>
      </Row>
    </>
  );
}

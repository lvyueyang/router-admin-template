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
  Dropdown,
} from 'antd';
import {
  ArrowUpOutlined,
  DownloadOutlined,
  DownOutlined,
  EditOutlined,
  PoweroffOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import {
  CmdInput,
  DEVICE_SERVICE_STATUS,
  DEVICE_SERVICE_STATUS_ENUM,
  getDeviceBaseInfo,
  getDeviceDiskList,
  getDeviceLog,
  getDownloadFilePath,
  getServiceList,
  rebootDevice,
  updateClock,
  updateIpGateWay,
  updateServiceStatus,
  updateSystem,
} from './module';
import { useParams } from 'umi';
import styles from './index.module.less';
import { useRequest } from 'ahooks';
import { useThemeToken } from '@/hooks/useThemeToken';
import PollingSelect, { usePollingInterval } from '@/components/PollingSelect';
import { DragUpload } from './module/components/DragUpload';
import { downloadFile } from '@/utils';
import EditPopover from '@/components/EditPopover';
import LogView from '@/components/LogView';

const colSpan = { md: 24, lg: 12 };
const cardProps: ProCardProps = {
  type: 'inner',
  size: 'small',
  bordered: true,
  className: styles.card,
};

interface ServiceListProps {
  id?: string;
}

function ServiceList({ id }: ServiceListProps) {
  const { colorSuccess, colorError } = useThemeToken();
  const { data, loading, run } = useRequest(() => {
    return getServiceList(id!).then((res) => res.data.data);
  });
  if (!id) return null;
  return (
    <Col lg={24}>
      <ProCard
        title="服务进程"
        gutter={[10, 10]}
        {...cardProps}
        loading={loading}
        extra={
          <Button type="primary" ghost onClick={run}>
            刷新
          </Button>
        }
      >
        {data?.map((info) => {
          return (
            <ProCard
              key={info.service_name}
              type="inner"
              size="small"
              bordered
              title={`${info.service_name} 进程`}
              extra={
                <Space>
                  <Dropdown
                    menu={{
                      items: Object.values(DEVICE_SERVICE_STATUS).map((item) => ({
                        label: item.label,
                        key: item.id,
                      })),
                      onClick: (e) => {
                        const cname =
                          Object.values(DEVICE_SERVICE_STATUS).find((item) => item.id === e.key)
                            ?.label || '操作';
                        const close = message.loading(cname + '中...', 0);
                        updateServiceStatus(
                          id!,
                          info.service_name,
                          e.key as DEVICE_SERVICE_STATUS_ENUM,
                        )
                          .then(() => {
                            message.success(cname + '成功');
                          })
                          .finally(() => {
                            close();
                          });
                      },
                    }}
                  >
                    <Button type="primary" ghost>
                      服务操作 <DownOutlined />
                    </Button>
                  </Dropdown>
                </Space>
              }
            >
              <ProCard>
                <Statistic
                  title="服务状态"
                  value={info?.status ? '在线' : '离线'}
                  valueStyle={{ color: info?.status ? colorSuccess : colorError }}
                />
              </ProCard>
            </ProCard>
          );
        })}
      </ProCard>
    </Col>
  );
}

function DiskList({ id }: { id: string }) {
  const { data, loading, run } = useRequest(() => {
    return getDeviceDiskList(id).then((res) => res.data.data);
  });
  return (
    <Col lg={24}>
      <ProCard
        {...cardProps}
        direction="column"
        title="硬盘信息"
        extra={
          <Button type="primary" ghost onClick={run}>
            刷新
          </Button>
        }
      >
        {data?.map((disk) => {
          return (
            <ProCard
              {...cardProps}
              style={{ marginBlockEnd: 8 }}
              wrap
              key={disk.hard_disk_name}
              loading={loading}
              title={
                <Space>
                  {/* <span>硬盘{index + 1}</span> */}
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
              <Row>
                <LogView value={disk.hard_disk_error_log} />
              </Row>
            </ProCard>
          );
        })}
      </ProCard>
    </Col>
  );
}

function LogInfo({ id }: { id: string }) {
  const { data, run } = useRequest(() => {
    return getDeviceLog(id).then((res) => res.data.data);
  });
  return (
    <>
      <Col {...colSpan} lg={24}>
        <ProCard
          {...cardProps}
          title="内核日志"
          collapsible
          extra={
            <Button ghost type="primary" onClick={run}>
              刷新
            </Button>
          }
        >
          <LogView value={data?.log_dmesg} />
        </ProCard>
      </Col>
      <Col {...colSpan} lg={24}>
        <ProCard {...cardProps} title="系统日志" collapsible>
          <LogView value={data?.system_log} />
        </ProCard>
      </Col>
    </>
  );
}

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
      return getDeviceBaseInfo(id!).then((res) => {
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
        <Col {...colSpan} lg={24}>
          <ProCard {...cardProps} title="主机信息">
            <ProCard>
              <Statistic title="CPU 占用" value={info?.cpu_use_rate} suffix={<small>%</small>} />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic title="CPU 温度" value={info?.cpu_tem} />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic
                title="内存"
                value={(info?.memory_use_rate || 0) * 100}
                suffix={<small>%</small>}
              />
            </ProCard>
            <ProCard>
              <Statistic title="电流" value={info?.electric_current} suffix={<small>A</small>} />
            </ProCard>
            <ProCard>
              <Statistic title="电压" value={info?.voltage} suffix={<small>V</small>} />
            </ProCard>
            <ProCard>
              <Statistic title="功率" value={info?.power} suffix={<small>W</small>} />
            </ProCard>
          </ProCard>
        </Col>
        {/* 网络 */}
        <Col {...colSpan} lg={24}>
          <ProCard {...cardProps} title="网络">
            <ProCard>
              <Statistic title="通断状态" value={'已连接'} valueStyle={{ color: colorSuccess }} />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic
                title={
                  <>
                    IP 地址{' '}
                    <EditPopover
                      value={info?.ip}
                      title="修改IP 地址"
                      trigger={['click']}
                      inputStyle={{ width: 300 }}
                      onConfirm={(value) => {
                        const close = message.loading('IP 修改中', 0);
                        updateIpGateWay({
                          mac_address: id!,
                          new_ip: value,
                          new_gateway: info?.gateway_ip || '',
                        })
                          .then(() => {
                            message.success('修改完成');
                            runAsync();
                          })
                          .finally(() => {
                            close();
                          });
                      }}
                    >
                      <a onClick={() => {}}>
                        <EditOutlined />
                      </a>
                    </EditPopover>
                  </>
                }
                value={info?.ip}
              ></Statistic>
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic
                title={
                  <>
                    网关地址{' '}
                    <EditPopover
                      value={info?.gateway_ip}
                      title="修改网关地址"
                      trigger={['click']}
                      inputStyle={{ width: 300 }}
                      onConfirm={(value) => {
                        const close = message.loading('网关地址修改中', 0);
                        updateIpGateWay({
                          mac_address: id!,
                          new_ip: info?.ip || '',
                          new_gateway: value,
                        })
                          .then(() => {
                            message.success('修改完成');
                            runAsync();
                          })
                          .finally(() => {
                            close();
                          });
                      }}
                    >
                      <a onClick={() => {}}>
                        <EditOutlined />
                      </a>
                    </EditPopover>
                  </>
                }
                value={info?.gateway_ip || '-'}
              />
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
                <Popconfirm
                  title="确定要进行系统升级吗？"
                  onConfirm={() => {
                    const close = message.loading('升级中...', 0);
                    updateSystem(id!)
                      .then(() => {
                        message.success('操作完成，升级中');
                      })
                      .finally(() => {
                        close();
                      });
                  }}
                >
                  <Button type="primary" danger ghost icon={<ArrowUpOutlined />}>
                    升级
                  </Button>
                </Popconfirm>
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
              <Statistic title="运行时长" value={info?.system_running_time} />
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
        <DiskList id={id!} />

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
        <LogInfo id={id!} />
      </Row>
    </>
  );
}

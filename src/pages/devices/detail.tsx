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
  Modal,
  Form,
  ModalProps,
  Alert,
} from 'antd';
import { DownloadOutlined, DownOutlined, PoweroffOutlined, SyncOutlined } from '@ant-design/icons';
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
  systemFs,
  systemInit,
  updateClock,
  updateDisk,
  updateIpGateWay,
  updateServiceStatus,
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
import CopyIcon from '@/components/CopyIcon';

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
                      items: Object.values(DEVICE_SERVICE_STATUS)
                        .filter((item) => {
                          if (item.id === info.status) {
                            return false;
                          }
                          return true;
                        })
                        .map((item) => ({
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
                          info.service_value,
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
                  value={
                    Object.values(DEVICE_SERVICE_STATUS).find((item) => item.id === info.status)
                      ?.label || '-'
                  }
                  valueStyle={{ color: info?.color }}
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
          <Space>
            <EditPopover
              title="请输入休眠时间"
              inputType="number"
              inputStyle={{ width: 200 }}
              inputNumberProps={{ addonAfter: 'x5秒', min: 0, max: 255, placeholder: '0 ~ 255' }}
              onConfirm={(e) => {
                const close = message.loading('休眠中...');
                updateDisk(id!, 2, Number(e))
                  .then(() => {
                    message.success('操作成功');
                  })
                  .finally(() => {
                    close();
                  });
              }}
            >
              <Button type="primary" ghost>
                休眠
              </Button>
            </EditPopover>
            {/* <Popconfirm
              title="确定要进行待机吗？"
              onConfirm={() => {
                const close = message.loading('待机中...');
                updateDisk(id!, 2)
                  .then(() => {
                    message.success('操作成功');
                  })
                  .finally(() => {
                    close();
                  });
              }}
            >
              <Button type="primary" ghost>
                待机
              </Button>
            </Popconfirm> */}
            <Button type="primary" ghost onClick={run}>
              刷新
            </Button>
          </Space>
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

interface FormValues {
  ip: string;
  gateway: string;
}
interface IpUpdateModalProps extends ModalProps {
  id: string;
  data: FormValues;
  onCancel?: () => void;
  onComplete?: () => void;
}

function IpUpdateModal({ id, data, onComplete, ...props }: IpUpdateModalProps) {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const submitHandler = () => {
    form.validateFields().then(() => {
      setLoading(true);
      const values = form.getFieldsValue();
      updateIpGateWay({
        mac_address: id,
        new_ip: values.ip,
        new_gateway: values.gateway,
      })
        .then(() => {
          props.onCancel?.();
          message.success('修改成功，设备将会重启');
          onComplete?.();
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };
  useEffect(() => {
    if (!props.open) return;
    form.setFieldsValue({
      ip: data.ip,
      gateway: data.gateway,
    });
  }, [props.open]);
  return (
    <Modal
      {...props}
      title="网关与 IP 地址修改"
      okButtonProps={{ loading }}
      footer={
        <Space>
          <Button onClick={props.onCancel}>取消</Button>
          <Popconfirm
            title="修改 IP 与网关地址会使设备重启，确定要修改吗？"
            onConfirm={submitHandler}
          >
            <Button type="primary">确定</Button>
          </Popconfirm>
        </Space>
      }
    >
      <br />
      <Form<FormValues> form={form} labelCol={{ span: 4 }}>
        <Form.Item label="IP 地址" name="ip" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="网关" name="gateway" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Alert
          message="注意！请和您的网络管理员确认网关和 IP 在同一网段且和管理平台是连通的！否则修改后将会导致无法连接。"
          type="warning"
        />
      </Form>
    </Modal>
  );
}

export default function DeviceDetailPage() {
  const [ipModal, setIpModal] = useState({
    open: false,
    data: {
      ip: '',
      gateway: '',
    },
  });
  const [customPath, setCustomPath] = useState('');
  const { id } = useParams();
  const pollingInterval = usePollingInterval();
  const { colorSuccess } = useThemeToken();
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
              <Statistic title="主板温度" value={info?.temperature} />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic
                title="内存"
                value={((info?.memory_use_rate || 0) * 100).toFixed(2)}
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
          <ProCard
            {...cardProps}
            title="网络"
            extra={
              <Button
                type="primary"
                ghost
                onClick={() => {
                  setIpModal((state) => ({
                    ...state,
                    open: true,
                    data: {
                      ...state.data,
                      ip: info?.ip || '',
                      gateway: info?.gateway_ip || '',
                    },
                  }));
                }}
              >
                网关与 IP 地址修改
              </Button>
            }
          >
            <ProCard>
              <Statistic title="通断状态" value={'已连接'} valueStyle={{ color: colorSuccess }} />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic
                title={
                  <>
                    IP 地址 <CopyIcon value={info?.ip || ''} />
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
                    网关地址 <CopyIcon value={info?.gateway_ip || ''} />
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
                {/* <Popconfirm
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
                </Popconfirm> */}
                <Popconfirm
                  title="确定要格式化吗？"
                  onConfirm={() => {
                    const close = message.loading('格式化中...', 0);
                    systemFs(id!)
                      .then(() => {
                        message.success('格式化成功');
                        runAsync();
                      })
                      .finally(() => {
                        close();
                      });
                  }}
                >
                  <Button type="primary" ghost danger>
                    格式化
                  </Button>
                </Popconfirm>
                <Popconfirm
                  title="确定要初始化吗？"
                  onConfirm={() => {
                    const close = message.loading('初始化中...', 0);
                    systemInit(id!)
                      .then(() => {
                        message.success('初始化成功');
                        runAsync();
                      })
                      .finally(() => {
                        close();
                      });
                  }}
                >
                  <Button type="primary" ghost danger>
                    初始化
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
              <Statistic
                title="系统盘容量"
                value={info?.system_disk_use}
                valueStyle={{ fontSize: 18 }}
              />
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
          <ProCard {...cardProps} title="系统升级">
            <DragUpload
              id={id!}
              path="/opt"
              update_type="upgrade_system"
              desc="请上传符合要求的系统镜像文件，上传完毕后将会开始升级"
            />
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
      <IpUpdateModal
        open={ipModal.open}
        id={id!}
        data={ipModal.data}
        onCancel={() => {
          setIpModal((state) => ({
            ...state,
            open: false,
          }));
        }}
      />
    </>
  );
}

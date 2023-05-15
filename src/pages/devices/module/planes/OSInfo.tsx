import { ProCard } from '@ant-design/pro-components';
import { Alert, Button, Col, message, Popconfirm, Space, Statistic, Tag, Tooltip } from 'antd';
import { colSpan, cardProps, RAID_STATUS } from '../constants';
import { getDownloadFilePath, getRaidInfo, rebootDevice, systemFs, systemInit } from '../services';
import { DownloadOutlined, PoweroffOutlined } from '@ant-design/icons';
import { downloadFile } from '@/utils';
import { useDeviceInfo } from '../hooks/useDeviceInfo';
import { useRequest } from 'ahooks';

export default function OSInfo() {
  const { info, id, loadInfo } = useDeviceInfo();
  const { data: raid } = useRequest(() => {
    return getRaidInfo(id).then((res) => res.data.data);
  });
  if (!info) return null;

  return (
    <>
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
                      loadInfo?.();
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
                      loadInfo?.();
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
                      loadInfo?.();
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
              title="操作系统"
              value={info?.system_version || '-'}
              valueStyle={{ fontSize: 18 }}
            />
          </ProCard>
          <ProCard>
            <Statistic
              title="版本号"
              value={info?.current_system_version || '-'}
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
      <Col {...colSpan} lg={24}>
        <ProCard
          {...cardProps}
          title={
            <>
              <span>Raid 信息</span>
              <Tag>{Object.values(RAID_STATUS).find((i) => i.id === raid?.raid_status)?.label}</Tag>
            </>
          }
        >
          {raid?.raid_status === RAID_STATUS.PENDING.id && (
            <Alert message={raid?.raid_info}></Alert>
          )}
        </ProCard>
      </Col>
    </>
  );
}

import Header from '@/components/Header';
import { Button, Row, Space, Tooltip, message } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { getDeviceBaseInfo } from './module';
import { useParams } from 'umi';
import { useRequest } from 'ahooks';
import PollingSelect, { usePollingInterval } from '@/components/PollingSelect';
import MainEngineInfo from './module/planes/MainEngineInfo';
import NetworkInfo from './module/planes/NetworkInfo';
import { DeviceInfoContext } from './module/hooks/useDeviceInfo';

import OSInfo from './module/planes/OSInfo';
import ClockInfo from './module/planes/ClockInfo';
import ServiceList from './module/planes/ServiceList';
import DiskAging from './module/planes/DiskAging';
import DiskList from './module/planes/DiskList';
import OSUpload from './module/planes/OSUpload';
import UploadFile from './module/planes/UploadFile';
import CMDInput from './module/planes/CMDInput';
import LogInfo from './module/planes/LogInfo';

export default function DeviceDetailPage() {
  const { id } = useParams();
  const pollingInterval = usePollingInterval();
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

  if (!id) return null;

  return (
    <DeviceInfoContext.Provider value={{ data: info, id, loadInfo: runAsync }}>
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
        <MainEngineInfo />
        {/* 网络 */}
        <NetworkInfo />
        {/* 操作系统 */}
        <OSInfo />
        {/* 服务进程 */}
        <ServiceList />
        {/* 时钟 */}
        <ClockInfo />
        {/* 硬盘老化 */}
        <DiskAging />
        {/* 硬盘 */}
        <DiskList />
        {/* 系统升级 */}
        <OSUpload />
        {/* 自定义上传文件 */}
        <UploadFile />
        {/* 执行命令 */}
        <CMDInput />
        {/* 日志 */}
        <LogInfo />
      </Row>
    </DeviceInfoContext.Provider>
  );
}

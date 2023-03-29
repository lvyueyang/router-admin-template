import { ProCard } from '@ant-design/pro-components';
import { Button, Col, message, Popconfirm, Row, Space, Tag } from 'antd';
import { cardProps } from '../constants';
import { diskAging, getDeviceDiskList, updateDisk } from '../services';
import { useDeviceInfo } from '../hooks/useDeviceInfo';
import { useRequest } from 'ahooks';
import LogView from '@/components/LogView';
import EditPopover from '@/components/EditPopover';

export default function DiskList() {
  const { info, id } = useDeviceInfo();
  const { data, loading, run } = useRequest(() => {
    return getDeviceDiskList(id!).then((res) => res.data.data);
  });
  if (!info) return null;
  return (
    <Col lg={24}>
      <ProCard
        {...cardProps}
        direction="column"
        title="硬盘信息"
        extra={
          <Space>
            <Popconfirm
              title="确定要进行硬盘老化操作吗？"
              onConfirm={() => {
                const close = message.loading('操作中...');
                diskAging(id!)
                  .then(() => {
                    message.success('操作成功');
                  })
                  .finally(() => {
                    close();
                  });
              }}
            >
              <Button type="primary" ghost>
                硬盘老化
              </Button>
            </Popconfirm>
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

import { ProCard } from '@ant-design/pro-components';
import { Button, Col, message, Popconfirm, Space, Tag, Tooltip } from 'antd';
import { cardProps } from '../constants';
import { diskAging, getDiskAgingInfo } from '../services';
import { useDeviceInfo } from '../hooks/useDeviceInfo';
import { useRequest } from 'ahooks';
import LogView from '@/components/LogView';

export default function DiskAging() {
  const { info, id } = useDeviceInfo();
  const { data, loading, run } = useRequest(() => {
    return getDiskAgingInfo(id!).then((res) => res.data.data);
  });
  if (!info) return null;
  return (
    <Col lg={24}>
      <ProCard
        {...cardProps}
        direction="column"
        loading={loading}
        title={
          <>
            <span style={{ marginRight: 20 }}>硬盘老化</span>
            {data?.disk_aging ? <Tag color="warning">运行中</Tag> : <Tag>未运行</Tag>}

            {!!data?.disk_aging_last_start_time && (
              <>
                <Tooltip title="最近一次老化时间">
                  <span>
                    {data?.disk_aging_last_start_time}{' '}
                    {!!data?.disk_aging_last_end_time && `~ ${data?.disk_aging_last_end_time}`}
                  </span>
                </Tooltip>
                {!data?.disk_aging && (
                  <>
                    {data?.disk_aging_last_value_status ? (
                      <Tag color="success">成功</Tag>
                    ) : (
                      <Tag color="error">失败</Tag>
                    )}
                  </>
                )}
              </>
            )}
          </>
        }
        extra={
          <Space>
            <Popconfirm
              title="确定要进行硬盘老化操作吗？"
              disabled={data?.disk_aging}
              onConfirm={() => {
                const close = message.loading('操作中...');
                diskAging(id!)
                  .then(() => {
                    message.success('操作成功');
                    run();
                  })
                  .finally(() => {
                    close();
                  });
              }}
            >
              <Button type="primary" ghost disabled={data?.disk_aging}>
                开始老化
              </Button>
            </Popconfirm>
            <Button type="primary" ghost onClick={run}>
              刷新
            </Button>
          </Space>
        }
      >
        <LogView value={data?.disk_aging_last_value_str || '暂无老化信息'} />
      </ProCard>
    </Col>
  );
}

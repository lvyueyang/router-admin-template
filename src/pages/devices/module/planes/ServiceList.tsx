import { ProCard } from '@ant-design/pro-components';
import { Button, Col, Dropdown, message, Space, Statistic } from 'antd';
import { cardProps, DEVICE_SERVICE_STATUS, DEVICE_SERVICE_STATUS_ENUM } from '../constants';
import { getServiceList, updateServiceStatus } from '../services';
import { useDeviceInfo } from '../hooks/useDeviceInfo';
import { useRequest } from 'ahooks';
import { DownOutlined } from '@ant-design/icons';
import SmbUserManage from '../components/SmbUserManage';

export default function ServiceList() {
  const { info, id } = useDeviceInfo();
  const { data, loading, run } = useRequest(() => {
    return getServiceList(id!).then((res) => res.data.data);
  });
  if (!info) return null;
  const hasSmb = !!data?.find((d) => d.service_value === 'smb');
  return (
    <>
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
      {hasSmb && (
        <Col lg={24}>
          <SmbUserManage />
        </Col>
      )}
    </>
  );
}

import { useThemeToken } from '@/hooks/useThemeToken';
import { DownOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import { useRequest } from 'ahooks';
import { Button, Col, Dropdown, message, Space, Statistic } from 'antd';
import { DEVICE_SERVICE_STATUS, DEVICE_SERVICE_STATUS_ENUM } from '../../constants';
import { getServiceList, updateServiceStatus } from '../../services';

interface ServiceListProps {
  id?: string;
}

export function ServiceList({ id }: ServiceListProps) {
  const { colorSuccess, colorError } = useThemeToken();
  const { data } = useRequest(() => {
    return getServiceList(id!).then((res) => res.data.data);
  });
  if (!id) return null;
  return (
    <>
      {data?.map((info) => {
        return (
          <Col md={24} lg={8} key={info.service_name}>
            <ProCard
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
          </Col>
        );
      })}
    </>
  );
}

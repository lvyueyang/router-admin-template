import { useThemeToken } from '@/hooks/useThemeToken';
import { DownOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import { useRequest } from 'ahooks';
import { Button, Col, Dropdown, Space, Statistic } from 'antd';
import { getServiceList } from '../../services';

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

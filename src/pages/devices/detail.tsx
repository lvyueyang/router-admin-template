import Header from '@/components/Header';
import { ProCard, ProCardProps } from '@ant-design/pro-components';

import { Button, Dropdown, Menu, Row, Col, Space, Statistic, Tag, Tooltip } from 'antd';
import { ArrowUpOutlined, DownOutlined, PoweroffOutlined, SyncOutlined } from '@ant-design/icons';

export default function DeviceDetailPage() {
  const colSpan = { md: 24, lg: 12 };
  const cardProps: ProCardProps = {
    type: 'inner',
    size: 'small',
    bordered: true,
  };
  return (
    <>
      <Header title="设备详情" />
      <Row gutter={[16, 16]} style={{ maxWidth: 1200 }}>
        {/* 主机信息 */}
        <Col {...colSpan}>
          <ProCard
            {...cardProps}
            title="主机信息"
            extra={
              <Tooltip title="刷新">
                <Button type="primary" ghost icon={<SyncOutlined />}>
                  刷新
                </Button>
              </Tooltip>
            }
          >
            <ProCard>
              <Statistic title="CPU 占用" value={80.0} />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic title="CPU 温度" value={80.0} />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic title="内存" value={80.0} />
            </ProCard>
          </ProCard>
        </Col>
        {/* 操作系统 */}
        <Col {...colSpan}>
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
                <Tooltip title="重启">
                  <Button type="primary" ghost icon={<PoweroffOutlined />}>
                    重启
                  </Button>
                </Tooltip>
              </Space>
            }
          >
            <ProCard>
              <Statistic title="运行时长" value={80.0} />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic title="版本号" value={80.0} />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic title="运行系统的分区" value={80.0} />
            </ProCard>
          </ProCard>
        </Col>
        {/* 服务进程与时钟 */}
        <Col {...colSpan}>
          <ProCard
            {...cardProps}
            title="服务进程与时钟"
            extra={
              <Space>
                <Dropdown
                  overlay={
                    <Menu
                      items={[
                        { label: '启动', key: '1' },
                        { label: '停止', key: '2' },
                        { label: '重启', key: '3' },
                      ]}
                    ></Menu>
                  }
                >
                  <Button type="primary" ghost>
                    服务操作 <DownOutlined />
                  </Button>
                </Dropdown>
                <Button type="primary" ghost>
                  修改时钟
                </Button>
              </Space>
            }
          >
            <ProCard>
              <Statistic title="服务状态" value={'正常'} />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic title="始终" value={'12:00:00'} />
            </ProCard>
          </ProCard>
        </Col>
        {/* 网络 */}
        <Col {...colSpan}>
          <ProCard
            {...cardProps}
            title="网络"
            extra={
              <Space>
                <Tooltip title="刷新">
                  <Button type="primary" ghost icon={<SyncOutlined />}>
                    刷新
                  </Button>
                </Tooltip>
              </Space>
            }
          >
            <ProCard>
              <Statistic title="通断状态" value={'正常'} />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic title="IP 地址" value={80.0} />
            </ProCard>
            <ProCard.Divider />
            <ProCard>
              <Statistic title="网关地址" value={80.0} />
            </ProCard>
          </ProCard>
        </Col>
        {/* 硬盘 */}
        <Col {...colSpan}>
          <ProCard
            {...cardProps}
            title={
              <>
                硬盘1 <Tag color="red">休眠</Tag>
              </>
            }
            extra={
              <Space>
                <Tooltip title="智能预测">
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
                </Tooltip>
              </Space>
            }
          >
            <Row justify="center">错误日志信息</Row>
          </ProCard>
        </Col>
        <Col {...colSpan}>
          <ProCard
            {...cardProps}
            title={
              <>
                硬盘2 <Tag color="blue">待机</Tag>
              </>
            }
            extra={
              <Space>
                <Tooltip title="智能预测">
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
                </Tooltip>
              </Space>
            }
          >
            <Row justify="center">暂无错误日志</Row>
          </ProCard>
        </Col>

        {/* 上传/下载文件 */}
        <Col {...colSpan}>
          <ProCard {...cardProps} title="上传/下载文件"></ProCard>
        </Col>
      </Row>
    </>
  );
}

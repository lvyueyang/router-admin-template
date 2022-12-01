import { PageContainer } from '@ant-design/pro-layout';
import { ProTable, ProColumns, ActionType, ProCard } from '@ant-design/pro-components';
import { getInvitationList } from '@/services';
import { transformPagination } from '@/utils';
import { CreateInvitationBody, InvitationItem } from '@/services/interface';
import { useRef, useState } from 'react';
import {
  Button,
  Drawer,
  Dropdown,
  Empty,
  Input,
  Menu,
  Row,
  Space,
  Statistic,
  Tag,
  Tooltip,
} from 'antd';
import Header from '@/components/Header';
import { useDetailModal } from '@/hooks/useDetailModal';
import { ArrowUpOutlined, DownOutlined, PoweroffOutlined, SyncOutlined } from '@ant-design/icons';

type TableItem = InvitationItem;
type FormValue = CreateInvitationBody;

export default function Devices() {
  const tableRef = useRef<ActionType>();
  const { detailModal, detailModalShow, detailModalClose } = useDetailModal<FormValue>();
  const [searchParams, setSearchParams] = useState({ search_keywords: '' });

  const columns: ProColumns<TableItem>[] = [
    {
      dataIndex: 'code',
      title: '主机名',
      hideInSearch: true,
      width: 330,
      copyable: true,
    },
    {
      dataIndex: 'status',
      title: '操作系统',
      hideInSearch: true,
    },
    {
      dataIndex: 'bind_uuid',
      title: '网络状态',
      hideInSearch: true,
    },
    {
      dataIndex: 'desc',
      title: '服务状态',
      hideInSearch: true,
    },
    {
      dataIndex: 'operate',
      title: '操作',
      hideInSearch: true,
      render: (_, row) => {
        return (
          <Button
            type="link"
            size="small"
            onClick={() => {
              detailModalShow(row);
            }}
          >
            操作
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <PageContainer>
        <ProTable<TableItem>
          columns={columns}
          rowKey="code"
          bordered
          search={false}
          request={({ ...params }) => {
            return getInvitationList({
              ...transformPagination(params),
              ...searchParams,
            }).then(({ data }) => {
              return { data: data.data.list || [], total: data.data.total };
            });
          }}
          actionRef={tableRef}
          headerTitle={
            <Input.Search
              value={searchParams.search_keywords}
              onChange={(e) => {
                setSearchParams((state) => ({
                  ...state,
                  search_keywords: e.target.value.trim(),
                }));
              }}
              style={{ width: 400 }}
              placeholder="请输入主机名搜索"
              enterButton={<>搜索</>}
              onSearch={() => {
                tableRef.current?.reload();
              }}
            />
          }
        />
        <Drawer
          open={detailModal.open}
          title={detailModal.data?.desc}
          onClose={detailModalClose}
          width={800}
          maskClosable={false}
        >
          <ProCard gutter={[0, 16]} ghost direction="column">
            {/* 主机信息 */}
            <ProCard
              type="inner"
              bordered
              title="主机信息"
              size="small"
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
            {/* 操作系统 */}
            <ProCard
              type="inner"
              bordered
              title="操作系统"
              size="small"
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
            {/* 网络 */}
            <ProCard type="inner" bordered title="网络" size="small">
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
            {/* 硬盘 */}
            <ProCard
              type="inner"
              bordered
              title={
                <>
                  硬盘1 <Tag color="red">休眠</Tag>
                </>
              }
              size="small"
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
            <ProCard
              type="inner"
              bordered
              title={
                <>
                  硬盘2 <Tag color="blue">待机</Tag>
                </>
              }
              size="small"
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
            {/* 服务进程与时钟 */}
            <ProCard
              bordered
              title="服务进程与时钟"
              size="small"
              type="inner"
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
            {/* 上传/下载文件 */}
            <ProCard bordered title="上传/下载文件" size="small" type="inner"></ProCard>
          </ProCard>
        </Drawer>
      </PageContainer>
    </>
  );
}

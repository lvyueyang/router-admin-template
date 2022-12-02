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
import { Link } from 'umi';

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
      render: () => {
        return <Link to={`/devices/123`}>查看</Link>;
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
      </PageContainer>
    </>
  );
}

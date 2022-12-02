import PageContainer from '@/components/PageContainer';
import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { getInvitationList } from '@/services';
import { transformPagination } from '@/utils';
import { InvitationItem } from '@/services/interface';
import { useRef, useState } from 'react';
import { Input } from 'antd';
import Header from '@/components/Header';
import { Link } from 'umi';

type TableItem = InvitationItem;

export default function Devices() {
  const tableRef = useRef<ActionType>();
  const [searchParams, setSearchParams] = useState({ search_keywords: '' });

  const columns: ProColumns<TableItem>[] = [
    {
      dataIndex: 'code',
      title: '集群名称',
      hideInSearch: true,
      width: 330,
      copyable: true,
    },
    {
      dataIndex: 'desc',
      title: '集群状态',
      hideInSearch: true,
    },
    {
      dataIndex: 'status',
      title: '对象存储数量',
      hideInSearch: true,
    },
    {
      dataIndex: 'bind_uuid',
      title: '文件存储数量',
      hideInSearch: true,
    },
    {
      dataIndex: 'operate',
      title: '操作',
      hideInSearch: true,
      render: () => {
        return <Link to={`/cluster/132`}>查看</Link>;
      },
    },
  ];

  return (
    <>
      <Header />
      <PageContainer>
        <ProTable<TableItem>
          size="small"
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
              placeholder="请输入集群名搜索"
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

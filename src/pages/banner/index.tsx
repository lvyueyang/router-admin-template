import Header from '@/components/Header';
import PageContainer from '@/components/PageContainer';
import { BANNER_POSITION, BANNER_STATUS } from '@/constants';
import { BannerInfo } from '@/interface/serverApi';
import { options2ValueEnum, transformPagination } from '@/utils';
import { message } from '@/utils/notice';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Input, Popconfirm, Space } from 'antd';
import { useRef, useState } from 'react';
import { Link, history } from 'umi';
import { getListApi, removeApi } from './module';

type TableItem = BannerInfo;

export default function BannerListPage() {
  const [searchForm, setSearchForm] = useState({
    keyword: '',
  });
  const tableRef = useRef<ActionType>();

  const columns: ProColumns<TableItem>[] = [
    {
      dataIndex: 'cover',
      title: '缩略图',
      valueType: 'image',
    },
    {
      dataIndex: 'title',
      title: '广告位名称',
    },
    {
      dataIndex: 'desc',
      title: '广告位描述',
      width: 300,
      ellipsis: true,
    },
    {
      dataIndex: 'link',
      title: '跳转地址',
      width: 300,
      ellipsis: true,
    },
    {
      dataIndex: 'position',
      title: '位置',
      valueEnum: options2ValueEnum(BANNER_POSITION),
    },
    {
      dataIndex: 'status',
      title: '状态',
      valueEnum: options2ValueEnum(BANNER_STATUS),
    },
    {
      dataIndex: 'create_date',
      title: '创建时间',
      valueType: 'dateTime',
    },
    {
      dataIndex: 'update_date',
      title: '修改时间',
      valueType: 'dateTime',
    },
    {
      dataIndex: 'operate',
      title: '操作',
      hideInSearch: true,
      width: 160,
      render: (_, row) => {
        return (
          <Space>
            <Link to={`/banner/update/${row.id}`}>编辑</Link>
            <Popconfirm
              title="确定要删除这个广告位吗？"
              onConfirm={() => {
                const close = message.loading('删除中...', 0);
                removeApi(row.id)
                  .then(() => {
                    message.success('删除成功');
                    tableRef.current?.reload();
                  })
                  .finally(() => {
                    close();
                  });
              }}
            >
              <a>删除</a>
            </Popconfirm>
          </Space>
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
          rowKey="id"
          bordered
          search={false}
          request={(params) => {
            return getListApi({ ...transformPagination(params), ...searchForm }).then(
              ({ data }) => {
                return { data: data.data.list, total: data.data.total || 0 };
              },
            );
          }}
          actionRef={tableRef}
          headerTitle={
            <Input.Search
              value={searchForm.keyword}
              onChange={(e) => {
                setSearchForm((state) => ({
                  ...state,
                  keyword: e.target.value.trim(),
                }));
              }}
              style={{ width: 400 }}
              placeholder="请输入广告位名称搜索"
              enterButton={<>搜索</>}
              onSearch={() => {
                tableRef.current?.setPageInfo?.({ current: 1 });
                tableRef.current?.reload();
              }}
            />
          }
          toolBarRender={() => [
            <Button
              key="create"
              type="primary"
              onClick={() => {
                history.push('/banner/create');
              }}
            >
              新增广告位
            </Button>,
          ]}
        />
      </PageContainer>
    </>
  );
}

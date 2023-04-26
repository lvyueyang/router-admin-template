import PageContainer from '@/components/PageContainer';
import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { DeviceItemResult, PingIpAddress, getDevicesList } from './module';
import { useRef, useState } from 'react';
import { Input, Tag } from 'antd';
import Header from '@/components/Header';
import { Link } from 'umi';

type TableItem = DeviceItemResult;

export default function Devices({
  operateRender,
}: {
  operateRender?: (row: TableItem) => React.ReactNode;
}) {
  const tableRef = useRef<ActionType>();
  const [searchParams, setSearchParams] = useState({ keywords: '' });

  const columns: ProColumns<TableItem>[] = [
    {
      dataIndex: 'host_name',
      title: '主机名',
      hideInSearch: true,
      copyable: true,
    },
    {
      dataIndex: 'ip',
      title: '设备 IP',
      hideInSearch: true,
      copyable: true,
    },
    {
      dataIndex: 'mac_add_str',
      title: 'MAC 地址',
      hideInSearch: true,
      copyable: true,
    },
    {
      dataIndex: 'system_info',
      title: '操作系统',
      hideInSearch: true,
    },
    {
      dataIndex: 'network_status',
      title: '网络状态',
      hideInSearch: true,
      render: (_, row) => {
        return row.network_status ? <Tag color="green">正常</Tag> : <Tag color="red">异常</Tag>;
      },
    },
    // {
    //   dataIndex: 'service_status',
    //   title: '服务状态',
    //   hideInSearch: true,
    //   render: (_, row) => {
    //     return row.service_status ? <Tag color="green">正常</Tag> : <Tag color="red">异常</Tag>;
    //   },
    // },
    {
      dataIndex: 'operate',
      title: '操作',
      hideInSearch: true,
      render: (_, row) => {
        if (operateRender) {
          return operateRender(row);
        }
        return <Link to={`/devices/${row.host_name}`}>查看</Link>;
      },
    },
  ];

  return (
    <>
      <Header>
        <PingIpAddress
          onComplete={() => {
            tableRef.current?.reload?.();
          }}
        />
      </Header>
      <PageContainer>
        <ProTable<TableItem>
          columns={columns}
          rowKey="ip"
          bordered
          search={false}
          request={() => {
            return getDevicesList(searchParams.keywords).then(({ data }) => {
              return { data: data.data.list || [], total: data.data.total };
            });
          }}
          actionRef={tableRef}
          headerTitle={
            <Input.Search
              value={searchParams.keywords}
              onChange={(e) => {
                setSearchParams((state) => ({
                  ...state,
                  keywords: e.target.value.trim(),
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

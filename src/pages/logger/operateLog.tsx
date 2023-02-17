import PageContainer from '@/components/PageContainer';
import { ProTable, ProColumns, ActionType, ProCard } from '@ant-design/pro-components';
import { getOperateLogList, OperateLogItemResult } from './module';
import { useRef } from 'react';
import { Tag } from 'antd';
import Header from '@/components/Header';
import ReactJson from 'react-json-view';
import { isJson } from '@/utils';

type TableItem = OperateLogItemResult;

export default function Devices() {
  const tableRef = useRef<ActionType>();

  const columns: ProColumns<TableItem>[] = [
    {
      dataIndex: 'msg',
      title: '日志类型',
    },
    {
      dataIndex: 'ip',
      title: '操作 IP',
    },
    {
      dataIndex: 'model',
      title: '操作模块',
    },
    {
      dataIndex: 'operation_user',
      title: '操作人',
    },
    {
      dataIndex: 'time',
      title: '操作时间',
    },
    // {
    //   dataIndex: 'param',
    //   title: '请求参数',
    // },
    // {
    //   dataIndex: 'resp',
    //   title: '响应参数',
    // },
    {
      dataIndex: 'req_status',
      title: '操作状态',
      hideInSearch: true,
      render: (_, row) => {
        return row.req_status ? <Tag color="green">成功</Tag> : <Tag color="red">失败</Tag>;
      },
    },
  ];

  return (
    <>
      <Header />
      <PageContainer>
        <ProTable<TableItem>
          columns={columns}
          rowKey="time"
          bordered
          search={false}
          request={() => {
            return getOperateLogList().then(({ data }) => {
              return { data: data.data || [], total: data.data.length };
            });
          }}
          pagination={false}
          actionRef={tableRef}
          expandable={{
            expandRowByClick: true,
            expandedRowRender: (row) => {
              const param = isJson(row.param);
              const result = isJson(row.resp);
              return (
                <ProCard size="small">
                  <ProCard title="请求参数" size="small">
                    {param ? <ReactJson name={false} src={param} /> : row.param || '无'}
                  </ProCard>
                  <ProCard title="响应参数" size="small">
                    {result ? <ReactJson name={false} src={result} /> : row.resp || '无'}
                  </ProCard>
                </ProCard>
              );
            },
          }}
        />
      </PageContainer>
    </>
  );
}

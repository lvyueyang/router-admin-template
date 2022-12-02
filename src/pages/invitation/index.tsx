import PageContainer from '@/components/PageContainer';
import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { createInvitation, getInvitationList } from '@/services';
import { transformPagination } from '@/utils';
import { CreateInvitationBody, InvitationItem } from '@/services/interface';
import { useRef } from 'react';
import { Form, Input, Modal, Button } from 'antd';
import { useFormModal } from '@/hooks/useFormModal';
import Header from '@/components/Header';

type TableItem = InvitationItem;
type FormValue = CreateInvitationBody;

export default function Invitation() {
  const tableRef = useRef<ActionType>();
  const { form, formModal, formModalShow, formModalClose, submitHandler } = useFormModal<FormValue>(
    {
      submit: async (values) => {
        await createInvitation({ desc: values.desc });
        tableRef.current?.reload();
      },
    },
  );

  const columns: ProColumns<TableItem>[] = [
    {
      hideInTable: true,
      key: 'search_keywords',
      dataIndex: 'search_keywords',
      fieldProps: {
        placeholder: '请输入邀请码搜索',
      },
    },
    {
      dataIndex: 'code',
      title: '邀请码',
      hideInSearch: true,
      width: 330,
      copyable: true,
    },
    {
      dataIndex: 'status',
      title: '状态',
      hideInSearch: true,
    },
    {
      dataIndex: 'bind_uuid',
      title: '绑定用户',
      hideInSearch: true,
    },
    {
      dataIndex: 'desc',
      title: '备注',
      hideInSearch: true,
    },
    {
      dataIndex: 'created_at',
      title: '创建时间',
      hideInSearch: true,
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
          request={({ search_keywords, ...params }) => {
            return getInvitationList({
              ...transformPagination(params),
              search_keywords: search_keywords?.trim(),
            }).then(({ data }) => {
              return { data: data.data.list || [], total: data.data.total };
            });
          }}
          actionRef={tableRef}
          toolBarRender={() => [
            <Button
              key="create"
              type="primary"
              onClick={() => {
                formModalShow();
              }}
            >
              创建邀请码
            </Button>,
          ]}
        />
        <Modal
          open={formModal.open}
          title="创建邀请码"
          style={{ maxWidth: 450 }}
          onCancel={formModalClose}
          onOk={submitHandler}
          okButtonProps={{ loading: formModal.submitLoading }}
          maskClosable={false}
        >
          <Form<FormValue> form={form} labelCol={{ xs: 4 }}>
            <Form.Item label="备注信息" name="desc">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </PageContainer>
    </>
  );
}

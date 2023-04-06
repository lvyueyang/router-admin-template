import { ProCard } from '@ant-design/pro-components';
import { Button, Form, Input, List, message, Modal, ModalProps, Popconfirm, Space } from 'antd';
import { useRequest } from 'ahooks';
import { createSMBUser, getSMBList, removeSMBUser, updatePasswordSMBUser } from '../../services';
import { useDeviceInfo } from '../../hooks/useDeviceInfo';
import { cardProps } from '../../constants';
import { CreateSMBBody, SMBItemResult } from '../../types';
import { useEffect, useState } from 'react';

class SmbUserModalState {
  open = false;
  data?: SMBItemResult;
  mode?: 'create' | 'updatePassword' = 'create';
}

type FormValues = CreateSMBBody & { confirmPassword: string };
interface SMBUserModalProps extends ModalProps {
  id: string;
  data: SmbUserModalState['data'];
  mode: SmbUserModalState['mode'];
  onCancel?: () => void;
  onComplete?: () => void;
}

function SMBUserModal({ id, data, mode, onComplete, ...props }: SMBUserModalProps) {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const submitHandler = () => {
    form.validateFields().then(() => {
      setLoading(true);
      const values = form.getFieldsValue();

      let submitFn = createSMBUser;
      let msg = '添加成功';

      if (mode === 'updatePassword') {
        submitFn = updatePasswordSMBUser;
        msg = '密码修改成功';
      }

      submitFn({
        mac_address: id,
        user_name: values.user_name,
        password: values.password,
      })
        .then(() => {
          props.onCancel?.();
          message.success(msg);
          onComplete?.();
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };
  useEffect(() => {
    if (!props.open) return;
    form.resetFields();
    if (mode === 'updatePassword' && data) {
      form.setFieldsValue({
        user_name: data.user_name,
      });
    }
  }, [props.open]);
  return (
    <Modal
      {...props}
      title={mode === 'create' ? '添加 SMB 用户' : '修改 SMB 用户密码'}
      okButtonProps={{ loading }}
      onOk={submitHandler}
    >
      <br />
      <Form<FormValues> form={form} labelCol={{ span: 4 }}>
        <Form.Item label="用户名" name="user_name" rules={[{ required: true }]}>
          <Input disabled={mode === 'updatePassword'} />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次密码输入不一致'));
              },
            }),
          ]}
          dependencies={['password']}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default function SmbUserManage() {
  const { id } = useDeviceInfo();
  const { data, run } = useRequest(() => {
    return getSMBList(id).then((res) => res.data.data);
  });
  const [smbUserModal, setSmbUserModal] = useState<SmbUserModalState>(new SmbUserModalState());

  if (!data) return null;

  return (
    <ProCard
      {...cardProps}
      title="SMB 用户列表"
      extra={
        <Button
          type="primary"
          onClick={() => {
            setSmbUserModal({
              open: true,
              mode: 'create',
            });
          }}
        >
          添加用户
        </Button>
      }
    >
      <List
        dataSource={data}
        renderItem={(item) => {
          return (
            <List.Item
              extra={
                <Space>
                  <a
                    onClick={() => {
                      setSmbUserModal({ open: true, mode: 'updatePassword', data: item });
                    }}
                  >
                    修改密码
                  </a>
                  <Popconfirm
                    title={<>确定要删除 SMB 用户 {item.user_name} 吗？</>}
                    onConfirm={() => {
                      message.loading(<>删除 SMB 用户 {item.user_name} 中</>);
                      removeSMBUser({ mac_address: id, user_name: item.user_name }).then(() => {
                        message.success('删除成功');
                        run?.();
                      });
                    }}
                  >
                    <a>删除</a>
                  </Popconfirm>
                </Space>
              }
            >
              {item.user_name}
            </List.Item>
          );
        }}
      ></List>

      <SMBUserModal
        open={smbUserModal.open}
        id={id}
        data={smbUserModal.data}
        mode={smbUserModal.mode}
        onComplete={run}
        onCancel={() => {
          setSmbUserModal({ open: false });
        }}
      />
    </ProCard>
  );
}

import Header from '@/components/Header';
import PageContainer from '@/components/PageContainer';
import { useRequest } from 'ahooks';
import { Button, Card, Form, Input, InputNumber, message, Select } from 'antd';
import { useEffect } from 'react';
import { getMailConfig, MailConfigResult, updateMailConfig } from './module';

type FormValues = MailConfigResult;

export default function EmailConfig() {
  const { data, run } = useRequest(() => {
    return getMailConfig().then((res) => res.data.data);
  });
  const [form] = Form.useForm<FormValues>();
  const { run: submitHandler, loading } = useRequest(
    () => {
      const values = form.getFieldsValue();
      return updateMailConfig(values).then(() => {
        message.success('更新成功');
        run?.();
        return {};
      });
    },
    { manual: true },
  );

  useEffect(() => {
    form.setFieldsValue({ ...data, to_email_list: data?.to_email_list || [] });
  }, [data]);
  return (
    <>
      <Header />
      <PageContainer>
        <Card style={{ maxWidth: 800 }}>
          <Form<FormValues> labelCol={{ span: 5 }} form={form} onFinish={submitHandler}>
            <Form.Item label="smtp服务器地址" name="smtp" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="邮箱端口" name="smtp_port" rules={[{ required: true }]}>
              <InputNumber style={{ width: 200 }} />
            </Form.Item>
            <Form.Item label="发件人" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="邮箱密码" name="email_password" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="收件人列表" name="to_email_list">
              <Select mode="tags" />
            </Form.Item>
            <Form.Item label=" " colon={false}>
              <Button type="primary" htmlType="submit" loading={loading}>
                保存
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </PageContainer>
    </>
  );
}

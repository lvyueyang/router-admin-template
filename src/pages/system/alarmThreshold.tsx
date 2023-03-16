import Header from '@/components/Header';
import PageContainer from '@/components/PageContainer';
import { useRequest } from 'ahooks';
import { Button, Card, Form, InputNumber, message, Space } from 'antd';
import { useEffect } from 'react';
import { AlarmThresholdResult, getAlarmThreshold, updateAlarmThreshold } from './module';

type FormValues = AlarmThresholdResult;

export default function EmailConfig() {
  const { data, run } = useRequest(() => {
    return getAlarmThreshold().then((res) => res.data.data);
  });
  const [form] = Form.useForm<FormValues>();
  const { run: submitHandler, loading } = useRequest(
    () => {
      const values = form.getFieldsValue();
      return updateAlarmThreshold(values).then(() => {
        message.success('更新成功');
        run?.();
        return {};
      });
    },
    { manual: true },
  );

  useEffect(() => {
    form.setFieldsValue({ ...data });
  }, [data]);

  return (
    <>
      <Header title="告警阈值设置"></Header>
      <PageContainer>
        <Card style={{ maxWidth: 800 }}>
          <Form<FormValues> labelCol={{ span: 5 }} form={form} onFinish={submitHandler}>
            <Form.Item label="CPU使用率" name="cpu_use_rate" rules={[{ required: true }]}>
              <InputNumber addonAfter="%" min={0} max={100} />
            </Form.Item>
            <Form.Item label="CPU温度" name="cpu_tem" rules={[{ required: true }]}>
              <InputNumber addonAfter="摄氏度" min={0} />
            </Form.Item>
            <Form.Item label=" " colon={false}>
              <Space>
                <Button type="primary" htmlType="submit" loading={loading}>
                  保存
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </PageContainer>
    </>
  );
}

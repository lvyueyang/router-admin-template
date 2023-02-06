import { Button, Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { updateECConfig } from './services';
import { ClusterDetailResult, UpdateECConfigBody } from './types';

interface Props {
  data: ClusterDetailResult;
  onComplete?: () => void;
}

type FormValue = UpdateECConfigBody;

const formItemProps = {
  rules: [{ required: true }],
  normalize: (e: string) => e.trim(),
};

export function UpdateECConfig({ data, onComplete }: Props) {
  const [form] = Form.useForm<FormValue>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      cluster_id: data.id,
      EC_MINIO_ACCESS_KEY: data.EC_MINIO_ACCESS_KEY,
      EC_MINIO_SECRET_KEY: data.EC_MINIO_SECRET_KEY,
      EC_HOME: data.EC_HOME,
      EC_MINIO_STORAGE_CLASS_STANDARD: data.EC_MINIO_STORAGE_CLASS_STANDARD,
      EC_MINIO_STORAGE_CLASS_RRS: data.EC_MINIO_STORAGE_CLASS_RRS,
    });
  }, []);
  const submitHandler = () => {
    const values = form.getFieldsValue();
    setLoading(true);
    updateECConfig(values)
      .then(() => {
        message.success('EC 参数修改成功');
        onComplete?.();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Form<FormValue>
      labelCol={{ span: 9 }}
      style={{ maxWidth: 700 }}
      form={form}
      onFinish={submitHandler}
    >
      <Form.Item label="cluster_id" name="cluster_id" hidden>
        <Input />
      </Form.Item>
      <Form.Item label="EC_MINIO_ACCESS_KEY" name="EC_MINIO_ACCESS_KEY" {...formItemProps}>
        <Input />
      </Form.Item>
      <Form.Item label="EC_MINIO_SECRET_KEY" name="EC_MINIO_SECRET_KEY" {...formItemProps}>
        <Input />
      </Form.Item>
      <Form.Item label="EC_HOME" name="EC_HOME" {...formItemProps}>
        <Input />
      </Form.Item>
      <Form.Item
        label="EC_MINIO_STORAGE_CLASS_STANDARD"
        name="EC_MINIO_STORAGE_CLASS_STANDARD"
        {...formItemProps}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="EC_MINIO_STORAGE_CLASS_RRS"
        name="EC_MINIO_STORAGE_CLASS_RRS"
        {...formItemProps}
      >
        <Input />
      </Form.Item>
      <Form.Item colon={false} label=" ">
        <Button type="primary" loading={loading} htmlType="submit">
          提交修改
        </Button>
      </Form.Item>
    </Form>
  );
}

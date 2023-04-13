import { Button, Form, Input, message, Popconfirm } from 'antd';
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
      // EC_RUN_CMD: data.EC_RUN_CMD,
    });
  }, []);
  const submitHandler = () => {
    const values = form.getFieldsValue();
    setLoading(true);
    updateECConfig(values)
      .then(() => {
        message.success('EC 参数修改成功，集群设备重启中');
        onComplete?.();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Form<FormValue> labelCol={{ span: 10 }} style={{ maxWidth: 700 }} form={form}>
      <Form.Item label="cluster_id" name="cluster_id" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        tooltip="EC_MINIO_ACCESS_KEY"
        label="用户名"
        name="EC_MINIO_ACCESS_KEY"
        {...formItemProps}
      >
        <Input />
      </Form.Item>
      <Form.Item
        tooltip="EC_MINIO_SECRET_KEY"
        label="密码"
        name="EC_MINIO_SECRET_KEY"
        {...formItemProps}
      >
        <Input />
      </Form.Item>
      <Form.Item tooltip="EC_HOME" label="根目录" name="EC_HOME" {...formItemProps}>
        <Input />
      </Form.Item>
      <Form.Item
        tooltip="EC_MINIO_STORAGE_CLASS_STANDARD"
        name="EC_MINIO_STORAGE_CLASS_STANDARD"
        label="存储等级标准"
        {...formItemProps}
      >
        <Input />
      </Form.Item>
      <Form.Item
        tooltip="EC_MINIO_STORAGE_CLASS_RRS"
        name="EC_MINIO_STORAGE_CLASS_RRS"
        label="存储类别"
        {...formItemProps}
      >
        <Input />
      </Form.Item>
      {/* <Form.Item tooltip="EC_RUN_CMD" label="启动参数" name="EC_RUN_CMD" {...formItemProps}>
        <Input />
      </Form.Item> */}
      <Form.Item colon={false} label=" ">
        <Popconfirm
          title="修改 EC 参数会使集群设备重启，确定要修改吗？"
          onConfirm={() => {
            form.validateFields().then(() => {
              submitHandler();
            });
          }}
        >
          <Button type="primary" loading={loading} htmlType="submit">
            提交修改
          </Button>
        </Popconfirm>
      </Form.Item>
    </Form>
  );
}

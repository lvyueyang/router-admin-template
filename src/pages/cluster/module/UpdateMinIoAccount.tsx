import { Button, Form, Input } from 'antd';

export function UpdateMinIoAccount() {
  return (
    <Form labelCol={{ span: 4 }} style={{ maxWidth: 400 }}>
      <Form.Item label="用户名">
        <Input />
      </Form.Item>
      <Form.Item label="密码">
        <Input.Password />
      </Form.Item>
      <Form.Item colon={false} label=" ">
        <Button type="primary">提交修改</Button>
      </Form.Item>
    </Form>
  );
}

import LoginContainer from '@/components/LoginContainer';
import { TOKEN_KEY } from '@/constants';
import { useUserinfoStore } from '@/store/userinfo';
import { message } from '@/utils/notice';
import { Button, Form, Input, Row, Space } from 'antd';
import { useState } from 'react';
import { history } from 'umi';
import { login } from './modules';

type LoginBody = any;

export default function Login() {
  const [form] = Form.useForm<LoginBody>();
  const [loading, setLoading] = useState(false);
  const { load: loadUser } = useUserinfoStore();
  const submitHandler = async (formValue: LoginBody) => {
    setLoading(true);
    login(formValue)
      .then(({ data }) => {
        localStorage.setItem(TOKEN_KEY, data.data.token);
        message.success('登录成功');
        loadUser();
        history.push('/');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <LoginContainer>
      <h3>
        <b>请登录</b>
      </h3>
      <br />
      <Form<LoginBody> colon={false} onFinish={submitHandler} style={{ width: 280 }} form={form}>
        <Form.Item name="employeeName" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder="请输入用户名/邮箱" autoComplete="off" />
        </Form.Item>
        <Form.Item name="passWord" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder="请输入您的密码" autoComplete="off" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            登陆
          </Button>
        </Form.Item>
        <Row justify="end" style={{ marginTop: -10 }}>
          <Space size={20}>
            {/* <Link to="/nopassword">找回密码</Link> */}
            {/* <Link to="/register">注册</Link> */}
          </Space>
        </Row>
      </Form>
    </LoginContainer>
  );
}

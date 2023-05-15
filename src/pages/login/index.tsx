import { Button, Card, Form, Input, message } from 'antd';
import { login } from '@/services';
import styles from './index.module.less';
import { LoginBody } from '@/services/interface';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { history } from 'umi';
import { TOKEN_COOKIE_KEY } from '@/constants';
import useUserInfo from '@/hooks/useUserInfo';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { loadUser } = useUserInfo();
  const submitHandler = async (formValue: LoginBody) => {
    setLoading(true);
    login(formValue)
      .then(({ data }) => {
        Cookies.set(TOKEN_COOKIE_KEY, data.data.token);
        message.success('登录成功');
        loadUser?.();
        history.push('/');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className={styles.loginContainer}>
      <Card style={{ width: 400 }} title="欢迎使用土星云管理系统">
        <Form<LoginBody> labelCol={{ span: 5 }} onFinish={submitHandler}>
          <Form.Item
            label="用户名"
            name="user_name"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入您的用户名" autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入您的密码" autoComplete="off" />
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button type="primary" htmlType="submit" loading={loading}>
              登陆
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

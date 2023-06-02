import LOGO from '@/assets/logo.png';
import useUserInfo from '@/hooks/useUserInfo';
import { outLogin } from '@/services';
import { DownOutlined } from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
import { Link, history } from 'umi';
import styles from './index.module.less';

export default function HeaderBar() {
  const { userInfo } = useUserInfo();
  return (
    <div className={`${styles.headerContainer} header`}>
      <Link to="/" className={styles.logoTitle}>
        <span className={styles.title}>
          <img src={LOGO} alt="" />
        </span>
      </Link>
      <div className={styles.userContainer}>
        <Dropdown
          menu={{
            items: [
              {
                label: '个人资料',
                key: 'userinfo',
                onClick: () => {
                  history.push('/userinfo');
                },
              },
              {
                label: '退出',
                key: 'outlogin',
                onClick: () => {
                  outLogin();
                  history.push('/login');
                },
              },
            ],
          }}
        >
          <div className={styles.item}>
            <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png">
              Avatar
            </Avatar>
            <span className={styles.username}>{userInfo?.cname || 'Admin'}</span>
            <DownOutlined />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}

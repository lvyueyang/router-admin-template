import { Link, history } from 'umi';
import LOGO from '@/assets/logo.png';
import styles from './index.module.less';
import { Avatar, Button, Dropdown, Row, Space, Tooltip } from 'antd';
import useUserInfo from '@/hooks/useUserInfo';
import { outLogin } from '@/services';

export default function HeaderBar() {
  const { userInfo } = useUserInfo();
  return (
    <div className={`${styles.headerContainer} header`}>
      <Link to="/" className={styles.logoTitle}>
        {/* <span className={styles.title}>
          <img src={LOGO} alt="" />
        </span> */}
        <span>管理系统</span>
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
          </div>
        </Dropdown>
      </div>
    </div>
  );
}

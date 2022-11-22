import { Avatar, Button, Menu, Row, Tooltip } from 'antd';
import LOGO from '@/assets/logo.png';
import {} from '@ant-design/icons';
import styles from './index.module.less';
import { history, Link } from 'umi';
import { TOKEN_COOKIE_KEY } from '@/constants';
import Cookies from 'js-cookie';
import useUserInfo from '@/hooks/useUserInfo';
import router from '../../../config/router';

interface RouterItem {
  path: string;
  icon?: React.ForwardRefExoticComponent<any>;
  title: string;
  routes?: RouterItem[];
}

interface Item {
  label: string;
  icon?: JSX.Element;
  key: string;
  children?: Item[];
}

function routers2menu(routers: RouterItem[]) {
  let menuList: Item[] = [];
  function loop(menus: Item[], children: RouterItem[]) {
    children.forEach((route) => {
      const Icon = route.icon;
      const item: Item = {
        label: route.title,
        icon: Icon ? <Icon /> : void 0,
        key: route.path,
      };
      if (route.routes) {
        item.children = [];
        loop(item.children, route.routes);
      }
      menus.push(item);
    });
  }
  loop(menuList, routers);
  return menuList;
}

const menuRouters = router.routes.find((r) => r.path === '/' && r.routes)?.routes || [];
const menus = routers2menu(menuRouters);

export default function SideBar() {
  const { userInfo } = useUserInfo();
  return (
    <div className={styles.sideBarContainer}>
      <Link to="/" className={styles.logoTitle}>
        <img src={LOGO} alt="土星云" />
        <span className={styles.title}>土星云</span>
      </Link>
      {/* 导航菜单 */}
      <Menu
        className={styles.menuList}
        defaultSelectedKeys={[location.pathname]}
        mode="inline"
        items={menus}
        onSelect={(e) => {
          history.push(e.key);
        }}
      />
      {/* 头像与退出 */}
      <Row className={styles.userContainer} align="middle">
        <Tooltip title={userInfo?.user_name}>
          <Row align="middle">
            <Avatar shape="square" src="">
              {userInfo?.user_name?.substring(0, 1).toLocaleUpperCase()}
            </Avatar>
            <span className={styles.username}>{userInfo?.user_name}</span>
          </Row>
        </Tooltip>
        <div>
          <Button
            type="text"
            onClick={() => {
              Cookies.remove(TOKEN_COOKIE_KEY);
              history.push('/login');
            }}
          >
            退出
          </Button>
        </div>
      </Row>
    </div>
  );
}

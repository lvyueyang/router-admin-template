import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import UserInfoContext from '@/context/UserInfo';

import { Outlet } from 'umi';
import { useEffect, useState } from 'react';
import { UserInfo } from '@/services/interface';
import { getUserInfo } from '@/services';

export default function DefaultLayout() {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const loadUserInfo = () => {
    getUserInfo().then(({ data }) => {
      setUserInfo(data.data);
    });
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <UserInfoContext.Provider value={{ data: userInfo, loadInfo: loadUserInfo }}>
        <Outlet />
      </UserInfoContext.Provider>
    </ConfigProvider>
  );
}

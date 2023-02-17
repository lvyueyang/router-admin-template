import { ClusterOutlined, FundFilled, HddFilled, CodeFilled } from '@ant-design/icons';

const router = {
  routes: [
    { path: '/login', component: 'login' },
    { path: '/', redirect: '/overview' },
    {
      path: '/',
      component: '@/layouts/main',
      routes: [
        {
          path: '/overview',
          component: 'overview',
          title: '概览',
          icon: FundFilled,
        },
        {
          path: '/devices',
          component: 'devices',
          title: '设备管理',
          icon: HddFilled,
        },
        {
          path: '/devices/:id',
          component: 'devices/detail',
          title: '设备详情',
          hideMenu: true,
        },
        {
          path: '/cluster',
          component: 'cluster',
          title: '集群管理',
          icon: ClusterOutlined,
        },
        {
          path: '/cluster/:id',
          component: 'cluster/detail',
          title: '集群详情',
          hideMenu: true,
        },
        {
          path: '/logger',
          title: '日志',
          icon: CodeFilled,
          routes: [
            {
              path: '/logger/operate',
              component: 'logger/operateLog',
              title: '操作日志',
            },
            // {
            //   path: '/logger/cluster',
            //   component: 'logger/clusterLog',
            //   title: '集群日志',
            // },
            {
              path: '/logger/device',
              component: 'logger/deviceLog',
              title: '设备日志',
            },
            {
              path: '/logger/device/:id',
              component: 'devices/log',
              title: '设备日志详情',
              hideMenu: true,
            },
            {
              path: 'xlsx',
              href: 'https://www.baidu.com',
              title: '报表',
            },
          ],
        },
      ],
    },
  ],
};
export default router;

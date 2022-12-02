import { FundOutlined, HddOutlined, ClusterOutlined, CodeOutlined } from '@ant-design/icons';

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
          icon: FundOutlined,
        },
        {
          path: '/devices',
          component: 'devices',
          title: '设备管理',
          icon: HddOutlined,
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
          component: 'logger',
          title: '日志',
          icon: CodeOutlined,
        },
      ],
    },
  ],
};
export default router;

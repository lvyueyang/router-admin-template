import {
  ClusterOutlined,
  FundFilled,
  HddFilled,
  CodeFilled,
  SettingFilled,
} from '@ant-design/icons';

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
          path: '/cluster/logger/:id',
          component: 'cluster/logger',
          title: '集群日志',
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
              path: '/logger/xlsx',
              component: 'logger/xls',
              title: '报表',
            },
          ],
        },
        {
          path: '/system',
          title: '系统配置',
          icon: SettingFilled,
          routes: [
            {
              path: '/system/email',
              component: 'system/index',
              title: '邮箱配置',
            },
            {
              path: '/system/alarmThreshold',
              component: 'system/alarmThreshold',
              title: '告警阈值配置',
            },
            {
              path: '/system/loggerCron',
              component: 'system/loggerCron',
              title: '日志定时发送设置',
            },
          ],
        },
        {
          path: '/userinfo',
          component: 'userinfo',
          title: '用户信息',
          hideMenu: true,
        },
      ],
    },
  ],
};
export default router;

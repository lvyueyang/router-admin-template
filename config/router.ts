const router = {
  routes: [
    { path: '/login', component: 'login' },
    { path: '/nopassword', component: 'nopassword' },
    {
      path: '/',
      component: '@/layouts/main',
      meta: {
        isMenuRoot: true,
      },
      routes: [
        {
          path: '/',
          component: 'home',
          title: '首页',
        },
        {
          path: '/userinfo',
          component: 'userinfo',
          title: '用户信息',
          menuHide: true,
        },
        {
          path: '/news',
          title: '新闻管理',
          routes: [
            {
              path: '/news/list',
              title: '新闻列表',
              component: 'news',
            },
            {
              path: '/news/create',
              component: 'news/form',
              title: '新增新闻',
            },
            {
              path: '/news/update/:id',
              component: 'news/form',
              title: '修改新闻',
              menuHide: true,
            },
          ],
        },
      ],
    },
    { path: '*', component: '404' },
  ],
};
export default router;

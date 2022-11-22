import { defineConfig } from 'umi';
import router from './router';

export default defineConfig({
  npmClient: 'yarn',
  proxy: {
    '/admin-api': {
      target: 'https://test-manage.kube.ucas',
      changeOrigin: true,
      secure: false,
    },
  },
  routes: router.routes,
  title: '土星云管理系统',
  // targets: {
  //   ie: 11,
  // },
  // codeSplitting: {
  //   jsStrategy: 'granularChunks',
  // },
});

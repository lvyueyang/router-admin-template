import { defineConfig } from 'umi';
import router from './router';

export default defineConfig({
  npmClient: 'yarn',
  proxy: {
    '/admin-api': {
      target: 'http://192.168.31.18:8085/',
      changeOrigin: true,
      secure: false,
    },
  },
  hash: true,
  routes: router.routes,
  title: '土星云管理系统',
  // mfsu: false,
  // targets: {
  //   ie: 11,
  // },
  // codeSplitting: {
  //   jsStrategy: 'granularChunks',
  // },
});

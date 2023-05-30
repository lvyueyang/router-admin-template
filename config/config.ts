import { defineConfig } from 'umi';
import router from './router';

export default defineConfig({
  npmClient: 'yarn',
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7003/',
      changeOrigin: true,
      secure: false,
    },
  },
  routes: router.routes,
  title: 'template',
  // mfsu: false,
  // targets: {
  //   ie: 11,
  // },
  // codeSplitting: {
  //   jsStrategy: 'granularChunks',
  // },
});

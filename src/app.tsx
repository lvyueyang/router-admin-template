import React from 'react';
import dayjs from 'dayjs';
import { RuntimeConfig } from 'umi';
import 'dayjs/locale/zh-cn';
import 'antd/dist/reset.css';
import { ThemeProvider } from './theme';
import pkg from '../package.json';

dayjs.locale('zh-cn');
console.log('version:', pkg.version);

export const rootContainer: RuntimeConfig['rootContainer'] = (container) => {
  return React.createElement(ThemeProvider, null, container);
};

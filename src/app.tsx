import React from 'react';
import dayjs from 'dayjs';
import { RuntimeConfig } from 'umi';
import 'dayjs/locale/zh-cn';
import 'antd/dist/reset.css';
import { ThemeProvider } from './theme';

dayjs.locale('zh-cn');

export const rootContainer: RuntimeConfig['rootContainer'] = (container) => {
  return React.createElement(ThemeProvider, null, container);
};

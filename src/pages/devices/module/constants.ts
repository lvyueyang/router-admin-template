import { TypeValue } from '@/types';
import { ProCardProps } from '@ant-design/pro-card';
import styles from '../index.module.less';

/** 服务状态 */
export const DEVICE_SERVICE_STATUS = {
  START: {
    id: 'start',
    label: '开启',
  },
  STOP: {
    id: 'stop',
    label: '停止',
  },
  RESTART: {
    id: 'restart',
    label: '重启',
  },
} as const;

export type DEVICE_SERVICE_STATUS_ENUM = TypeValue<typeof DEVICE_SERVICE_STATUS>['id'];

export const colSpan = { md: 24, lg: 12 };
export const cardProps: ProCardProps = {
  type: 'inner',
  size: 'small',
  bordered: true,
  className: styles.card,
};

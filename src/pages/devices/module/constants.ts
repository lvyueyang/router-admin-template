import { TypeValue } from '@/types';

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

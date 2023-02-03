import { TypeValue } from '@/types';

/** 用户登录后储存在 cookie 中的 token */
export const TOKEN_COOKIE_KEY = 'token';

/** API 请求前缀 */
export const AIP_FIX = '/admin-api';

/** 集群类型 */
export const CLUSTER_TYPE = {
  MINIO: {
    id: 'minio',
    label: 'MinIO',
  },
  GLUSTERD: {
    id: 'glusterd',
    label: 'glusterd',
  },
  ISCSI: {
    id: 'iscsi',
    label: 'iscsi',
  },
} as const;

export type CLUSTER_TYPE_ENUM = TypeValue<typeof CLUSTER_TYPE>['id'];

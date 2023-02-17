import { AIP_FIX } from '@/constants';
import { Result } from '@/types';
import { OperateLogItemResult } from './types';
import request from '@/services/request';

/** 操作日志列表 */
export const getOperateLogList = (keywords = '') => {
  return request.post<Result<OperateLogItemResult[]>>(`${AIP_FIX}/log/GetOperationLatelyList`, {
    keywords,
  });
};

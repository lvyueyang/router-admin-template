import { AIP_FIX } from '@/constants';
import { Result } from '@/types';
import { OverFlowDataResult } from './types';
import request from '@/services/request';

/** 概览数据 */
export const getOverflowData = () => {
  return request.post<Result<OverFlowDataResult>>(`${AIP_FIX}/dashboard/info`);
};

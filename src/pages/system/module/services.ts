import { AIP_FIX } from '@/constants';
import { Result } from '@/types';
import { MailConfigResult } from './types';
import request from '@/services/request';

/** 邮箱配置 */
export const getMailConfig = () => {
  return request.get<Result<MailConfigResult>>(`${AIP_FIX}/log/GetSendMailConfig`);
};

/** 设置邮箱配置 */
export const updateMailConfig = (body: MailConfigResult) => {
  return request.post<Result<void>>(`${AIP_FIX}/log/SetSendMailConfig`, body);
};

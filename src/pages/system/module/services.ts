import { AIP_FIX } from '@/constants';
import { Result } from '@/types';
import { AlarmThresholdResult, MailConfigResult } from './types';
import request from '@/services/request';

/** 邮箱配置 */
export const getMailConfig = () => {
  return request.get<Result<MailConfigResult>>(`${AIP_FIX}/log/GetSendMailConfig`);
};

/** 设置邮箱配置 */
export const updateMailConfig = (body: MailConfigResult) => {
  return request.post<Result<void>>(`${AIP_FIX}/log/SetSendMailConfig`, body);
};

/** 日志发送到邮箱 */
export const sendEmail = () => {
  return request.post<Result<void>>(`${AIP_FIX}/log/LogSendMail`);
};

/** 获取告警阈值 */
export const getAlarmThreshold = () => {
  return request.get<Result<AlarmThresholdResult>>(`${AIP_FIX}/tools/GetAlarmThresholdInfo`);
};

/** 设置告警阈值 */
export const updateAlarmThreshold = (body: AlarmThresholdResult) => {
  return request.post<Result<void>>(`${AIP_FIX}/tools/SetAlarmThreshold`, body);
};

// 日志定时发送到邮箱 获取
export const getLoggerCron = () => {
  return request.get<Result<{ value: string }>>(`${AIP_FIX}/config/GetSendLogMailCronDate`);
};

// 日志定时发送到邮箱 更新
export const updateLoggerCron = (value: string) => {
  return request.post<Result<void>>(`${AIP_FIX}/config/SetSendLogMailCronDate`, {
    value,
  });
};

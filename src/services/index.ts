import { SendPhoneCaptchaType, TOKEN_KEY } from '@/constants';
import { AIP_FIX, Result, request } from '@/request';
import { Userinfo } from '@/types';
import { AxiosProgressEvent } from 'axios';

/** 获取当前登录用户信息 */
export const getUserInfo = () => {
  return request.get<Userinfo>(`${AIP_FIX}/userinfo`, { ignoreNotice: true });
};

/** 退出登录 */
export const outLogin = () => {
  return request.post<Result<null>>(`${AIP_FIX}/outlogin`).then(() => {
    localStorage.removeItem(TOKEN_KEY);
  });
};

/** 文件上传 */
export const uploadFile = (
  file: File,
  options?: { onUploadProgress?: (p: AxiosProgressEvent) => void },
) => {
  const formData = new FormData();
  formData.append('file', file);
  return request.post<Result<string>>(`${AIP_FIX}/upload`, formData, {
    onUploadProgress: options?.onUploadProgress,
  });
};

/** 发送手机号验证码 */
export const sendSmsCode = (phone: string) => {
  return request.post<Result<void>>(`${AIP_FIX}/user/send-code`, { phone });
};

/** 发送邮箱验证码 */
export const sendEmailCode = (email: string) => {
  return request.post<Result<void>>(`${AIP_FIX}/send-validate-code/forget-password`, { email });
};

/** 发送短信验证码 */
export const sendSMSCaptcha = (phone: string, send_type: SendPhoneCaptchaType) => {
  return request.post<Result<any>>(`${AIP_FIX}/user/send-code`, { phone, send_type });
};

/** 发送邮箱验证码 */
export const sendEmailCaptcha = (email: string, send_type: SendEmailCaptchaType) => {
  return request.post<Result<any>>(`${AIP_FIX}/user/send-check-email-code`, {
    email,
    send_type,
  });
};

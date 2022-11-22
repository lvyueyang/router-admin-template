import { AIP_FIX, OPERATE_RESOURCE_ENUM, TENANT_ACCOUNT_TYPE_ENUM } from '@/constants';
import {
  CreateInvitationBody,
  InvitationItem,
  ListResult,
  Pagination,
  Result,
  SuperAdminInfo,
  SystemConfigBody,
  SystemConfigItem,
  TenantAccountTypeTotalItem,
  TenantItem,
} from './interface';
import request from './request';

export * from './modules/user';

/** 获取租户列表 */
export const getTenantList = (
  body: Pagination & { search_keywords?: string; account_type?: number },
) => {
  return request.post<ListResult<TenantItem>>(`${AIP_FIX}/user/userList`, body);
};
/** 获取租户列表 */
export const getTenantAccountTypeTotal = () => {
  return request.post<Result<TenantAccountTypeTotalItem[]>>(`${AIP_FIX}/user/GetUserTotalByType`);
};

/** 获取租户超管信息 */
export const getTenantSuperAdminInfo = (uuid: string) => {
  return request.post<Result<SuperAdminInfo>>(`${AIP_FIX}/user/MinioAdminInfo`, { uuid });
};

/** 资源释放与拉起 */
export const userOperateResources = (uuid: string, type: OPERATE_RESOURCE_ENUM) => {
  return request.post<Result<void>>(`${AIP_FIX}/user/AdminReleaseResources`, {
    uuid,
    type,
  });
};

/** 资源释放与拉起 */
export const updateTenantAccountType = (uuid: string, type: TENANT_ACCOUNT_TYPE_ENUM) => {
  return request.post<Result<void>>(`${AIP_FIX}/user/SetTrialAccount`, {
    uuid,
    type,
  });
};

/** 邀请码列表 */
export const getInvitationList = (body: Pagination & { search_keywords?: string }) => {
  return request.post<ListResult<InvitationItem>>(`${AIP_FIX}/user/GetInvitationCodeList`, body);
};

/** 添加邀请码 */
export const createInvitation = (body: CreateInvitationBody) => {
  return request.post<ListResult<InvitationItem>>(`${AIP_FIX}/user/CreateInvitationCode`, body);
};

/** 获取配置列表 */
export const getSystemConfigList = (body: Pagination) => {
  return request.post<ListResult<SystemConfigItem>>(`${AIP_FIX}/user/GetConfigMapList`, body);
};

/** 添加配置*/
export const createSystemConfig = (body: SystemConfigBody) => {
  return request.post(`${AIP_FIX}/user/CreateConfigInfo`, body);
};

/** 更新配置 */
export const updateSystemConfig = (body: SystemConfigBody) => {
  return request.post(`${AIP_FIX}/user/UpdateConfigInfo`, body);
};

/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface FriendlinkQueryListDto {
  /**
   * 分页查询-当前页
   * @default 1
   */
  current?: number;
  /**
   * 分页查询-每页数量
   * @default 10
   */
  page_size?: number;
  /** 友情链接名称-模糊搜索 */
  keyword?: string;
}

export interface AdminRole {
  id: number;
  name: string;
  desc?: string;
  permission_code?: string[];
  /** @format date-time */
  create_date: string;
  /** @format date-time */
  update_date: string;
}

export interface UserAdmin {
  id: number;
  username: string;
  password: string;
  cname: string;
  email: string;
  is_root?: boolean;
  /** @format date-time */
  out_login_date?: string;
  roles: AdminRole[];
  /** @format date-time */
  create_date: string;
  /** @format date-time */
  update_date: string;
}

export interface FriendlinkInfo {
  id: number;
  title: string;
  url: string;
  type: string;
  authorId?: number;
  author: UserAdmin;
  /** @format date-time */
  create_date: string;
  /** @format date-time */
  update_date: string;
}

export interface FriendlinkList {
  list: FriendlinkInfo[];
  total: number;
}

export interface FriendlinkListResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: FriendlinkList;
}

export interface FriendlinkDetailResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: FriendlinkInfo;
}

export interface FriendlinkCreateDto {
  /** 友情链接名称 */
  title: string;
  /** 友情链接类型 */
  type: string;
  /** 友情链接地址 */
  url: string;
}

export interface FriendlinkUpdateDto {
  /** 友情链接名称 */
  title: string;
  /** 友情链接类型 */
  type: string;
  /** 友情链接地址 */
  url: string;
}

export interface FriendlinkDetailIdResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: number;
}

export interface ResponseResult {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
}

export interface UserAdminLoginBody {
  /** 密码 */
  password: string;
  /** 用户名/邮箱 */
  username: string;
}

export interface UserAdminLoginResponse {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: {
    token: string;
  };
}

export interface UserAdminOutLoginResponse {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
}

export interface BannerQueryListDto {
  /**
   * 分页查询-当前页
   * @default 1
   */
  current?: number;
  /**
   * 分页查询-每页数量
   * @default 10
   */
  page_size?: number;
  /** 广告位名称-模糊搜索 */
  keyword?: string;
}

export interface BannerInfo {
  status: '1' | '0';
  position: 'home';
  id: number;
  title: string;
  desc?: string;
  link?: string;
  cover: string;
  is_delete: boolean;
  authorId?: number;
  author: UserAdmin;
  /** @format date-time */
  create_date: string;
  /** @format date-time */
  update_date: string;
}

export interface BannerList {
  list: BannerInfo[];
  total: number;
}

export interface BannerListResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: BannerList;
}

export interface BannerDetailResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: BannerInfo;
}

export interface BannerCreateDto {
  /** 广告位名称 */
  title: string;
  /** 广告位描述 */
  desc?: string;
  /** 跳转地址 */
  link?: string;
  /** 广告位状态 */
  status: '1' | '0';
  /** 广告位位置 */
  position: 'home';
  /** 广告位封面 */
  cover: string;
}

export interface BannerUpdateDto {
  /** 广告位名称 */
  title: string;
  /** 广告位描述 */
  desc?: string;
  /** 跳转地址 */
  link?: string;
  /** 广告位状态 */
  status: '1' | '0';
  /** 广告位位置 */
  position: 'home';
  /** 广告位封面 */
  cover: string;
}

export interface BannerDetailIdResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: number;
}

export interface UserAdminInfo {
  id: number;
  username: string;
  password: string;
  cname: string;
  email: string;
  is_root?: boolean;
  /** @format date-time */
  out_login_date?: string;
  roles: AdminRole[];
  /** @format date-time */
  create_date: string;
  /** @format date-time */
  update_date: string;
}

export interface UserAdminList {
  list: UserAdminInfo[];
  total: number;
}

export interface UserAdminListResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: UserAdminList;
}

export interface UserAdminCreateDto {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 昵称 */
  cname: string;
  /** 邮箱 */
  email: string;
}

export interface UserAdminIdResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  /** 用户 ID */
  data: number;
}

export interface UserAdminInfoResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: UserAdminInfo;
}

export interface UserAdminUpdateDto {
  /** 昵称 */
  cname: string;
}

export interface UserAdminUpdatePasswordDto {
  /** 密码 */
  password: string;
}

export interface UserAdminUpdateRolesDto {
  /** 角色 ID */
  roles: number[];
}

export interface UserAdminForgetPasswordDto {
  /** 邮箱 */
  email: string;
  /** 验证码 */
  code: string;
  /** 密码 */
  password: string;
}

export interface UserAdminFileUploadDto {
  /** @format binary */
  file: File;
}

export interface UserAdminCreateRootDto {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 昵称 */
  cname: string;
  /** 邮箱 */
  email: string;
}

export interface AdminRoleCreateDto {
  /** 角色名称 */
  name: string;
  /** 角色描述 */
  desc?: string;
}

export interface AdminRoleIdResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  /** 角色 ID */
  data: number;
}

export interface AdminRoleInfo {
  /** @format date-time */
  create_date: string;
  /** @format date-time */
  update_date: string;
  id: number;
  name: string;
  desc?: string;
  permission_code?: string[];
}

export interface AdminRoleList {
  list: AdminRoleInfo[];
  total: number;
}

export interface AdminRoleListResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: AdminRoleList;
}

export interface CodeInfo {
  code: string;
  cname: string;
  groupName?: string;
}

export interface AdminPermissionCodeListResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: CodeInfo[];
}

export interface AdminRoleInfoResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  /** 角色详情 */
  data: AdminRoleInfo;
}

export interface AdminRoleUpdateDto {
  /** 角色名称 */
  name: string;
  /** 角色描述 */
  desc?: string;
}

export interface AdminRoleUpdatePermissionCodeDto {
  /** 权限码 */
  codes: string[];
}

export interface EmailValidateCodeCreateDto {
  /** 邮箱 */
  email: string;
}

export interface ImageValidateCodeResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: {
    data: string;
    hash: string;
  };
}

export interface LoggerListResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  /** 日志列表 */
  data: string[];
}

export interface LoggerDetailResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  /** 日志详情 */
  data: string[];
}

export interface NewsQueryListDto {
  /**
   * 分页查询-当前页
   * @default 1
   */
  current?: number;
  /**
   * 分页查询-每页数量
   * @default 10
   */
  page_size?: number;
  /**
   * 被排序的字段
   * @default "create_at"
   */
  order_key?: string;
  /**
   * 排序方式 DESC 降序 ASC 倒序
   * @default 10
   */
  order_type?: string;
  /** 新闻中心名称-模糊搜索 */
  keyword?: string;
}

export interface NewsInfo {
  type: '1' | '2' | '3';
  /** 是否为推荐, 0 为不推荐, 后续可根据值大小进行排序 */
  recommend: number;
  id: number;
  title: string;
  cover?: string;
  desc?: string;
  content: string;
  is_delete: boolean;
  /** @format date-time */
  push_date?: string;
  authorId?: number;
  author: UserAdmin;
  /** @format date-time */
  create_date: string;
  /** @format date-time */
  update_date: string;
}

export interface NewsList {
  list: NewsInfo[];
  total: number;
}

export interface NewsListResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: NewsList;
}

export interface NewsDetailResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: NewsInfo;
}

export interface NewsCreateDto {
  /** 新闻中心名称 */
  title: string;
  /** 新闻类型 */
  type: '1' | '2' | '3';
  /** 新闻中心描述 */
  desc?: string;
  /** 新闻中心封面 */
  cover?: string;
  /** 新闻中心详情 */
  content: string;
  /**
   * 发布时间
   * @format date-time
   */
  push_date: string;
  /**
   * 推荐等级, 0 为不推荐
   * @min 0
   */
  recommend: number;
}

export interface NewsUpdateDto {
  /** 新闻中心名称 */
  title: string;
  /** 新闻类型 */
  type: '1' | '2' | '3';
  /** 新闻中心描述 */
  desc?: string;
  /** 新闻中心封面 */
  cover?: string;
  /** 新闻中心详情 */
  content: string;
  /**
   * 发布时间
   * @format date-time
   */
  push_date: string;
  /**
   * 推荐等级, 0 为不推荐
   * @min 0
   */
  recommend: number;
}

export interface NewsDetailIdResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: number;
}

export interface ProductTypeQueryListDto {
  /**
   * 分页查询-当前页
   * @default 1
   */
  current?: number;
  /**
   * 分页查询-每页数量
   * @default 10
   */
  page_size?: number;
  /** 产品类型名称-模糊搜索 */
  keyword?: string;
}

export interface ProductTypeInfo {
  department: '1' | '2' | '3' | '4' | '5' | '6';
  id: number;
  name: string;
  desc?: string;
  is_delete: boolean;
  authorId?: number;
  author: UserAdmin;
  /** @format date-time */
  create_date: string;
  /** @format date-time */
  update_date: string;
}

export interface ProductTypeList {
  list: ProductTypeInfo[];
  total: number;
}

export interface ProductTypeListResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: ProductTypeList;
}

export interface ProductTypeDetailResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: ProductTypeInfo;
}

export interface ProductTypeCreateDto {
  /** 产品类型名称 */
  name: string;
  /** 产品类型描述 */
  desc?: string;
  /** 产品类型所属部门 */
  department: '1' | '2' | '3' | '4' | '5' | '6';
}

export interface ProductTypeUpdateDto {
  /** 产品类型名称 */
  name: string;
  /** 产品类型描述 */
  desc?: string;
  /** 产品类型所属部门 */
  department: '1' | '2' | '3' | '4' | '5' | '6';
}

export interface ProductTypeDetailIdResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: number;
}

export interface ProductQueryListDto {
  /**
   * 分页查询-当前页
   * @default 1
   */
  current?: number;
  /**
   * 分页查询-每页数量
   * @default 10
   */
  page_size?: number;
  /**
   * 被排序的字段
   * @default "create_at"
   */
  order_key?: string;
  /**
   * 排序方式 DESC 降序 ASC 倒序
   * @default 10
   */
  order_type?: string;
  /** 产品名称-模糊搜索 */
  keyword?: string;
}

export interface ProductType {
  department: '1' | '2' | '3' | '4' | '5' | '6';
  id: number;
  name: string;
  desc?: string;
  is_delete: boolean;
  authorId?: number;
  author: UserAdmin;
  /** @format date-time */
  create_date: string;
  /** @format date-time */
  update_date: string;
}

export interface ProductInfo {
  /** 是否为推荐, 0 为不推荐, 后续可根据值大小进行排序 */
  recommend: number;
  department: '1' | '2' | '3' | '4' | '5' | '6';
  id: number;
  name: string;
  covers: string[];
  url?: string;
  tags: string[];
  desc?: string;
  content: string;
  is_delete: boolean;
  authorId?: number;
  author: UserAdmin;
  typeId?: number;
  type: ProductType;
  /** @format date-time */
  create_date: string;
  /** @format date-time */
  update_date: string;
}

export interface ProductList {
  list: ProductInfo[];
  total: number;
}

export interface ProductListResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: ProductList;
}

export interface ProductDetailResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: ProductInfo;
}

export interface ProductCreateDto {
  /** 产品名称 */
  name: string;
  /** 外部链接 */
  url: string;
  /** 产品描述 */
  desc?: string;
  /** 产品图 */
  covers: string[];
  /** 产品类型 */
  type: number;
  /** 产品标签 */
  tags: string[];
  /**
   * 推荐等级, 0 为不推荐
   * @min 0
   */
  recommend: number;
  /** 产品详情 */
  content: string;
}

export interface ProductUpdateDto {
  /** 产品名称 */
  name: string;
  /** 外部链接 */
  url: string;
  /** 产品描述 */
  desc?: string;
  /** 产品图 */
  covers: string[];
  /** 产品类型 */
  type: number;
  /** 产品标签 */
  tags: string[];
  /**
   * 推荐等级, 0 为不推荐
   * @min 0
   */
  recommend: number;
  /** 产品详情 */
  content: string;
}

export interface ProductDetailIdResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: number;
}

export interface DepartmentQueryListDto {
  /**
   * 分页查询-当前页
   * @default 1
   */
  current?: number;
  /**
   * 分页查询-每页数量
   * @default 10
   */
  page_size?: number;
  /**
   * 被排序的字段
   * @default "create_at"
   */
  order_key?: string;
  /**
   * 排序方式 DESC 降序 ASC 倒序
   * @default 10
   */
  order_type?: string;
  /** 部门管理名称-模糊搜索 */
  keyword?: string;
}

export interface DepartmentInfo {
  label: string;
  value: string;
  content: string;
  url: string;
}

export interface DepartmentList {
  list: DepartmentInfo[];
  total: number;
}

export interface DepartmentListResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: DepartmentList;
}

export interface DepartmentDetailResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: DepartmentInfo;
}

export interface DepartmentUpdateDto {
  /** 部门链接 */
  url?: string;
  /** 部门管理详情 */
  content: string;
}

export interface DepartmentDetailIdResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: number;
}

export interface JobQueryListDto {
  /**
   * 分页查询-当前页
   * @default 1
   */
  current?: number;
  /**
   * 分页查询-每页数量
   * @default 10
   */
  page_size?: number;
  /** 招聘管理名称-模糊搜索 */
  keyword?: string;
}

export interface JobInfo {
  education: '1' | '2' | '3' | '4' | '5' | '6' | '7';
  id: number;
  job_name: string;
  total: number;
  jd: string;
  requirement: string;
  base: string;
  to_email: string;
  is_delete: boolean;
  authorId?: number;
  author: UserAdmin;
  /** @format date-time */
  create_date: string;
  /** @format date-time */
  update_date: string;
}

export interface JobList {
  list: JobInfo[];
  total: number;
}

export interface JobListResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: JobList;
}

export interface JobDetailResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: JobInfo;
}

export interface JobCreateDto {
  /** 职位名称 */
  job_name: string;
  /** 人数 */
  total: number;
  /** 工作职责描述 */
  jd: string;
  /** 任职要求 */
  requirement: string;
  /** 学历要求 */
  education: '1' | '2' | '3' | '4' | '5' | '6' | '7';
  /** 工作地点 */
  base: string;
  /** 简历接收邮箱 */
  to_email: string;
}

export interface JobUpdateDto {
  /** 职位名称 */
  job_name: string;
  /** 人数 */
  total: number;
  /** 工作职责描述 */
  jd: string;
  /** 任职要求 */
  requirement: string;
  /** 学历要求 */
  education: '1' | '2' | '3' | '4' | '5' | '6' | '7';
  /** 工作地点 */
  base: string;
  /** 简历接收邮箱 */
  to_email: string;
}

export interface JobDetailIdResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: number;
}

export interface CominfoInfo {
  type: 'introduce' | 'licheng' | 'jingzhengli';
  id: number;
  title?: string;
  cover?: string;
  desc?: string;
  content?: string;
  data?: object;
  /** @format date-time */
  create_date: string;
  /** @format date-time */
  update_date: string;
}

export interface CominfoDetailResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: CominfoInfo;
}

export interface CominfoUpdateDto {
  /** 公司信息类型 */
  type: 'introduce' | 'licheng' | 'jingzhengli';
  /** 公司信息名称 */
  title?: string;
  /** 公司信息描述 */
  desc?: string;
  /** 公司信息封面 */
  cover?: string;
  /** 公司信息详情 */
  content?: string;
  /** 公司信息数据信息， 可以存储json对象 */
  data?: object;
}

export interface CominfoDetailIdResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: number;
}

export interface HonorQueryListDto {
  /**
   * 分页查询-当前页
   * @default 1
   */
  current?: number;
  /**
   * 分页查询-每页数量
   * @default 10
   */
  page_size?: number;
  /** 荣誉资质名称-模糊搜索 */
  keyword?: string;
}

export interface HonorInfo {
  id: number;
  title: string;
  cover: string;
  is_delete: boolean;
  authorId?: number;
  author: UserAdmin;
  /** @format date-time */
  create_date: string;
  /** @format date-time */
  update_date: string;
}

export interface HonorList {
  list: HonorInfo[];
  total: number;
}

export interface HonorListResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: HonorList;
}

export interface HonorDetailResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: HonorInfo;
}

export interface HonorCreateDto {
  /** 荣誉资质名称 */
  title: string;
  /** 荣誉资质封面 */
  cover: string;
}

export interface HonorUpdateDto {
  /** 荣誉资质名称 */
  title: string;
  /** 荣誉资质封面 */
  cover: string;
}

export interface HonorDetailIdResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: number;
}

export interface MaterialQueryListDto {
  /**
   * 分页查询-当前页
   * @default 1
   */
  current?: number;
  /**
   * 分页查询-每页数量
   * @default 10
   */
  page_size?: number;
  /** 资料名称-模糊搜索 */
  keyword?: string;
}

export interface MaterialInfo {
  id: number;
  title: string;
  desc?: string;
  url: string;
  is_delete: boolean;
  authorId?: number;
  author: UserAdmin;
  /** @format date-time */
  create_date: string;
  /** @format date-time */
  update_date: string;
}

export interface MaterialList {
  list: MaterialInfo[];
  total: number;
}

export interface MaterialListResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: MaterialList;
}

export interface MaterialDetailResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: MaterialInfo;
}

export interface MaterialCreateDto {
  /** 资料名称 */
  title: string;
  /** 资料描述 */
  desc?: string;
  /** 资料下载地址 */
  url: string;
}

export interface MaterialUpdateDto {
  /** 资料名称 */
  title: string;
  /** 资料描述 */
  desc?: string;
  /** 资料下载地址 */
  url: string;
}

export interface MaterialDetailIdResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: number;
}

export interface CaseQueryListDto {
  /**
   * 分页查询-当前页
   * @default 1
   */
  current?: number;
  /**
   * 分页查询-每页数量
   * @default 10
   */
  page_size?: number;
  /**
   * 被排序的字段
   * @default "create_at"
   */
  order_key?: string;
  /**
   * 排序方式 DESC 降序 ASC 倒序
   * @default 10
   */
  order_type?: string;
  /** 应用案例名称-模糊搜索 */
  keyword?: string;
}

export interface CaseInfo {
  type: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
  /** 是否为推荐, 0 为不推荐, 后续可根据值大小进行排序 */
  recommend: number;
  id: number;
  title: string;
  cover: string;
  desc?: string;
  content: string;
  is_delete: boolean;
  authorId?: number;
  author: UserAdmin;
  /** @format date-time */
  create_date: string;
  /** @format date-time */
  update_date: string;
}

export interface CaseList {
  list: CaseInfo[];
  total: number;
}

export interface CaseListResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: CaseList;
}

export interface CaseDetailResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: CaseInfo;
}

export interface CaseCreateDto {
  /** 应用案例类型 */
  type: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
  /** 应用案例名称 */
  title: string;
  /** 应用案例描述 */
  desc?: string;
  /** 应用案例封面 */
  cover: string;
  /**
   * 推荐等级, 0 为不推荐
   * @min 0
   */
  recommend: number;
  /** 应用案例详情 */
  content: string;
}

export interface CaseUpdateDto {
  /** 应用案例类型 */
  type: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
  /** 应用案例名称 */
  title: string;
  /** 应用案例描述 */
  desc?: string;
  /** 应用案例封面 */
  cover: string;
  /**
   * 推荐等级, 0 为不推荐
   * @min 0
   */
  recommend: number;
  /** 应用案例详情 */
  content: string;
}

export interface CaseDetailIdResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: number;
}

export interface CommentQueryListDto {
  /**
   * 分页查询-当前页
   * @default 1
   */
  current?: number;
  /**
   * 分页查询-每页数量
   * @default 10
   */
  page_size?: number;
  /**
   * 被排序的字段
   * @default "create_at"
   */
  order_key?: string;
  /**
   * 排序方式 DESC 降序 ASC 倒序
   * @default 10
   */
  order_type?: string;
  /** 用户留言名称-模糊搜索 */
  keyword?: string;
}

export interface CommentInfo {
  status: '0' | '1';
  id: number;
  tel: string;
  name: string;
  content: string;
  is_delete: boolean;
  /** @format date-time */
  create_date: string;
  /** @format date-time */
  update_date: string;
}

export interface CommentList {
  list: CommentInfo[];
  total: number;
}

export interface CommentListResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: CommentList;
}

export interface CommentDetailResponseDto {
  /**
   * 状态码
   * @default 200
   */
  code: number;
  /**
   * 状态描述
   * @default "请求成功"
   */
  message: string;
  data: CommentInfo;
}

export interface CommentCreateDto {
  /** 称呼 */
  name: string;
  /** 电话 */
  tel: string;
  /** 验证码 hash */
  codeHash: string;
  /** 验证码 */
  code: string;
  /**
   * 用户留言详情
   * @maxLength 200
   */
  content: string;
}

export interface CommentUpdateDto {
  /** 状态 */
  status: '0' | '1';
}

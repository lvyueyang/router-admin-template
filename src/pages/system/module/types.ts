/** 邮箱配置 */
export interface MailConfigResult {
  smtp: string; // smtp服务器地址
  smtp_port: number; // 邮箱端口
  email: string; // 发件人
  email_password: string; // 邮箱密码
  to_email_list: string[]; // 收件人列表
}

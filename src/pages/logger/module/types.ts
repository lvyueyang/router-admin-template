export interface OperateLogItemResult {
  time: string; //操作时间
  msg: string; //日志类型
  model: string; //操作模块
  operation_user: string; //操作人
  ip: string; //操作ip
  req_status: boolean; //操作状态 true 成功 false 失败
  param: string; //请求参数
  resp: string; //响应结果
}

import { message } from 'antd';

interface TransformPaginationOption {
  current?: number;
  pageSize?: number;
}
/** antd-pro-table 分页参数格式化 */
export function transformPagination({ current, pageSize }: TransformPaginationOption) {
  return {
    page: current || 1,
    page_size: pageSize || 10,
  };
}

/** 复制文字 */
export const copyText = (text: string) => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof window.navigator.clipboard?.writeText === 'function') {
        window.navigator.clipboard.writeText(text).then(resolve).catch(reject);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.select();
        document.execCommand('Copy');
        resolve(true);
      }
    } catch (e) {
      message.error('复制失败');
      reject(e);
    }
  });
};

export function downloadFile(url: string, name?: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = name || url.split('/').reverse()[0];
  a.target = '_blank';
  a.click();
  a.remove();
}

export function isJson(value: string) {
  try {
    const obj = JSON.parse(value);
    if (typeof obj === 'object' && !!obj) {
      return obj;
    }
    return false;
  } catch (e) {
    return false;
  }
}

import { Button, Space } from 'antd';
import { ClusterDetailResult } from './types';

interface Props {
  data: ClusterDetailResult;
}

export function SSLCard({ data }: Props) {
  return (
    <Space>
      <Button ghost type="primary">
        开启
      </Button>
      <Button ghost type="primary">
        关闭
      </Button>
      <Button ghost type="primary">
        证书文件操作
      </Button>
    </Space>
  );
}

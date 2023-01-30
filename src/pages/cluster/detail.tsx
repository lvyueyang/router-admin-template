import Header from '@/components/Header';
import { ProCard } from '@ant-design/pro-components';

export default function ClusterDetailPage() {
  return (
    <>
      <Header title="集群详情" />
      <div>
        <ProCard ghost direction="column" gutter={[16, 16]}>
          <ProCard size="small" type="inner" title="对象存储" onClick={() => {}}></ProCard>
          <ProCard size="small" type="inner" title="文件存储"></ProCard>
        </ProCard>
      </div>
    </>
  );
}

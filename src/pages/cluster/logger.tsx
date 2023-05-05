import Header from '@/components/Header';
import { Button } from 'antd';
import { getClusterDetail, getClusterLogger } from './module';
import styles from './index.module.less';
import { useRequest } from 'ahooks';
import { useParams } from 'umi';
import LogView from '@/components/LogView';

export default function ClusterDetailPage() {
  const { id } = useParams();
  const { data, run, loading } = useRequest(() => {
    return getClusterLogger(id!).then((res) => res.data.data);
  });
  const { data: info } = useRequest(() => {
    return getClusterDetail(id!).then((res) => res.data.data);
  });
  return (
    <>
      <Header title={`集群日志 - ${info?.name}`}>
        <Button
          type="primary"
          danger
          ghost
          onClick={() => {
            run?.();
          }}
          loading={loading}
        >
          刷新
        </Button>
      </Header>
      <div className={styles.loggerWrap}>
        <LogView value={data}></LogView>
      </div>
    </>
  );
}

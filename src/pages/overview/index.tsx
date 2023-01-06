import Header from '@/components/Header';
import PageContainer from '@/components/PageContainer';
import { StatisticCard } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { getOverflowData } from './module';

export default function Overview() {
  const { data } = useRequest(() => {
    return getOverflowData().then((res) => res.data.data);
  });

  return (
    <>
      <Header />
      <PageContainer>
        <StatisticCard.Group direction="row" style={{ marginBottom: 15 }}>
          <StatisticCard statistic={{ title: '设备总数', value: data?.total_equipment }} />
          <StatisticCard.Divider type="vertical" />
          <StatisticCard statistic={{ title: '在线数', value: data?.up_equipment }} />
          <StatisticCard.Divider type="vertical" />
          <StatisticCard statistic={{ title: '离线数', value: data?.down_equipment }} />
        </StatisticCard.Group>
        <StatisticCard.Group direction="row">
          <StatisticCard statistic={{ title: '集群总数', value: data?.cluster_total }} />
          <StatisticCard.Divider type="vertical" />
          <StatisticCard statistic={{ title: '在线数', value: data?.cluster_up }} />
          <StatisticCard.Divider type="vertical" />
          <StatisticCard statistic={{ title: '离线数', value: data?.cluster_down }} />
        </StatisticCard.Group>
      </PageContainer>
    </>
  );
}

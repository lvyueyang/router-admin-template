import Header from '@/components/Header';
import PageContainer from '@/components/PageContainer';
import { getOverflowData } from '@/services';
import { StatisticCard } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';

export default function Overview() {
  const { data } = useRequest(() => {
    return getOverflowData().then((res) => res.data.data);
  });

  return (
    <>
      <Header />
      <PageContainer>
        <StatisticCard.Group direction="row" style={{ marginBottom: 15 }}>
          <StatisticCard statistic={{ title: '设备总数量', value: data?.total_equipment }} />
          <StatisticCard.Divider type="vertical" />
          <StatisticCard statistic={{ title: '在线数量', value: data?.up_equipment }} />
          <StatisticCard.Divider type="vertical" />
          <StatisticCard statistic={{ title: '离线数量', value: data?.down_equipment }} />
        </StatisticCard.Group>
        <StatisticCard.Group direction="row">
          <StatisticCard statistic={{ title: '集群数量' }} />
          <StatisticCard.Divider type="vertical" />
          <StatisticCard statistic={{ title: '运行状态' }} />
        </StatisticCard.Group>
      </PageContainer>
    </>
  );
}

import Header from '@/components/Header';
import { PageContainer } from '@ant-design/pro-layout';
import { StatisticCard } from '@ant-design/pro-components';

export default function Overview() {
  return (
    <>
      <Header />
      <PageContainer>
        <StatisticCard.Group direction="row" style={{ marginBottom: 15 }}>
          <StatisticCard statistic={{ title: '设备总数量', value: 100 }} />
          <StatisticCard.Divider type="vertical" />
          <StatisticCard statistic={{ title: 'UP 状态数量', value: 100 }} />
          <StatisticCard.Divider type="vertical" />
          <StatisticCard statistic={{ title: 'down 状态数量', value: 100 }} />
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

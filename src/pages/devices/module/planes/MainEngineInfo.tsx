import { ProCard } from '@ant-design/pro-components';
import { Col, Statistic } from 'antd';
import { colSpan, cardProps } from '../constants';
import { useDeviceInfo } from '../hooks/useDeviceInfo';

export default function MainEngineInfo() {
  const { info } = useDeviceInfo();
  if (!info) return null;
  return (
    <Col {...colSpan} lg={24}>
      <ProCard {...cardProps} title="主机信息">
        <ProCard>
          <Statistic title="CPU 占用" value={info?.cpu_use_rate} suffix={<small>%</small>} />
        </ProCard>
        <ProCard.Divider />
        <ProCard>
          <Statistic title="CPU 温度" value={info?.cpu_tem} />
        </ProCard>
        <ProCard.Divider />
        <ProCard>
          <Statistic title="主板温度" value={info?.temperature} />
        </ProCard>
        <ProCard.Divider />
        <ProCard>
          <Statistic
            title="内存"
            value={((info?.memory_use_rate || 0) * 100).toFixed(2)}
            suffix={<small>%</small>}
          />
        </ProCard>
        <ProCard>
          <Statistic title="电流" value={info?.electric_current} suffix={<small>A</small>} />
        </ProCard>
        <ProCard>
          <Statistic title="电压" value={info?.voltage} suffix={<small>V</small>} />
        </ProCard>
        <ProCard>
          <Statistic title="功率" value={info?.power} suffix={<small>W</small>} />
        </ProCard>
      </ProCard>
    </Col>
  );
}

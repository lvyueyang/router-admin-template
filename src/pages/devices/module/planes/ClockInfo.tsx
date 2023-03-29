import { ProCard } from '@ant-design/pro-components';
import { Button, Col, DatePicker, message, Space, Statistic, Tooltip } from 'antd';
import { colSpan, cardProps } from '../constants';
import { useDeviceInfo } from '../hooks/useDeviceInfo';
import { updateClock } from '../services';
import styles from '../../index.module.less';

export default function ClockInfo() {
  const { info, id, loadInfo } = useDeviceInfo();
  return (
    <Col {...colSpan} lg={24}>
      <ProCard
        {...cardProps}
        title="时钟"
        extra={
          <Space>
            <div className={styles.updateClock}>
              <Button type="primary" ghost>
                修改时钟
              </Button>
              <DatePicker
                showTime
                className={styles.clockInput}
                onChange={(e) => {
                  updateClock(id, e!.format('YYYY-MM-DD HH:mm:ss')).then(() => {
                    message.success('更新完成');
                    loadInfo?.();
                  });
                }}
              />
            </div>
          </Space>
        }
      >
        <ProCard>
          <Tooltip title={info?.time_string} placement="topLeft">
            <Statistic title="" value={info?.time_string ? info?.time_string : '-'} />
          </Tooltip>
        </ProCard>
      </ProCard>
    </Col>
  );
}

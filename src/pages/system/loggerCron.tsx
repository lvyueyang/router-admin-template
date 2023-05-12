import Header from '@/components/Header';
import PageContainer from '@/components/PageContainer';
import { useRequest } from 'ahooks';
import { Button, Card, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { getAlarmThreshold, getLoggerCron, updateLoggerCron } from './module';
import CronEditor from '@/components/CronEditor';

export default function LoggerCron() {
  const [value, setValue] = useState('0 10-19 * * 1-5');
  const { data, run } = useRequest(() => {
    return getAlarmThreshold().then((res) => res.data.data);
  });
  const { run: submitHandler, loading } = useRequest(
    () => {
      return updateLoggerCron(value).then(() => {
        message.success('更新成功');
        run?.();
        return {};
      });
    },
    { manual: true },
  );

  useEffect(() => {
    getLoggerCron().then((res) => {
      setValue(res.data.data.value);
    });
  }, [data]);

  return (
    <>
      <Header></Header>
      <PageContainer>
        <Card style={{ maxWidth: 800 }}>
          <Input value={value} />

          <div style={{ margin: '30px 0' }}>
            <CronEditor value={value} onChange={setValue} />
          </div>
          <div>
            <Button type="primary" disabled={!value} onClick={submitHandler} loading={loading}>
              保存
            </Button>
          </div>
        </Card>
      </PageContainer>
    </>
  );
}

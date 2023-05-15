import Header from '@/components/Header';
import PageContainer from '@/components/PageContainer';
import { useRequest } from 'ahooks';
import { Button, Card, Input, Switch, message } from 'antd';
import { useEffect, useState } from 'react';
import { getAlarmThreshold, getLoggerCron, updateLoggerCron } from './module';
import CronEditor from '@/components/CronEditor';

export default function LoggerCron() {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState('0 10-19 * * 1-5');
  const { data, run } = useRequest(() => {
    return getAlarmThreshold().then((res) => res.data.data);
  });
  const { run: submitHandler, loading } = useRequest(
    () => {
      return updateLoggerCron(open ? value : '').then(() => {
        message.success('更新成功');
        run?.();
        return {};
      });
    },
    { manual: true },
  );

  useEffect(() => {
    getLoggerCron().then((res) => {
      const value = res.data.data.value;
      if (value) {
        setValue(res.data.data.value);
      }
      setOpen(!!value);
    });
  }, [data]);

  return (
    <>
      <Header></Header>
      <PageContainer>
        <Card style={{ maxWidth: 800 }}>
          <div>
            开启/关闭: <Switch checked={open} onChange={setOpen}></Switch>
          </div>
          <br />
          {open && (
            <>
              <Input value={value} />

              <div style={{ margin: '30px 0' }}>
                <CronEditor value={value} onChange={setValue} />
              </div>
            </>
          )}
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

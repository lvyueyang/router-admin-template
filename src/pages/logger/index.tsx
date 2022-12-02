import Header from '@/components/Header';
import PageContainer from '@/components/PageContainer';
import { Tabs, Button } from 'antd';
import styles from './index.module.less';

const TAB_LIST = [
  {
    label: '内核日志',
    key: '1',
    children: <>内核日志</>,
  },
  {
    label: '系统日志',
    key: '2',
    children: <>系统日志</>,
  },
  {
    label: '服务日志',
    key: '3',
    children: <>服务日志</>,
  },
];

export default function Logger() {
  return (
    <>
      <Header />
      <PageContainer>
        <div className={styles.container}>
          <Tabs
            items={TAB_LIST}
            type="card"
            tabBarExtraContent={
              <Button type="link" size="small">
                导出日志
              </Button>
            }
          />
        </div>
      </PageContainer>
    </>
  );
}

import { getOperateLogDownloadUrl } from './module';

import Header from '@/components/Header';
import { useRequest } from 'ahooks';

export default function Devices() {
  const { data } = useRequest(() => {
    return getOperateLogDownloadUrl().then((res) => {
      console.log(res.data.data);
      return res.data.data;
    });
  });

  return (
    <>
      <Header />
      <div style={{ margin: '-15px' }}>
        <iframe
          src={`/${data}`}
          frameBorder="0"
          style={{ width: '100%', height: 'calc(100vh - 73px)' }}
        />
      </div>
    </>
  );
}

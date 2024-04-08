import Layout from '@/components/Layout';
import { Outlet } from 'umi';

export default function DefaultLayout() {
  // const { data: user, load } = useUserinfoStore();
  // useEffect(() => {
  //   load();
  // }, []);
  // if (!user) return <Skeleton />;
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

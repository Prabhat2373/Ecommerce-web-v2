import AppSuspense from '../features/suspense/AppSuspense';
import Layout from './Layout';

const AppLayout = (props: any) => {
  return (
    <AppSuspense>
      <Layout {...props} />
    </AppSuspense>
  );
};

export default AppLayout;

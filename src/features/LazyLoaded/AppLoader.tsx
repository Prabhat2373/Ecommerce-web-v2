import { Suspense } from 'react';
import Loading from '../../components/Loading';

const AppLoader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );

export default AppLoader;

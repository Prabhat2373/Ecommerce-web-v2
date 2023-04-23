import { Suspense } from 'react';

const AppLoader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Component {...props} />
    </Suspense>
  );

export default AppLoader;

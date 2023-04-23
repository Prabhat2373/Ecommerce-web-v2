import React, { Suspense } from 'react';

const AppSuspense = ({ children }: any) => {
  return <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>;
};

export default AppSuspense;

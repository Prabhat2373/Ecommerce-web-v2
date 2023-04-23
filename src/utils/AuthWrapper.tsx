import React from 'react';
import { useSelector } from 'react-redux';

const AuthWrapper = ({ children }: any) => {
  const user = useSelector((state: any) => state.user.user);

  if (user?.isLoggedIn) {
    return <></>;
  }
  return children;
};

export default AuthWrapper;

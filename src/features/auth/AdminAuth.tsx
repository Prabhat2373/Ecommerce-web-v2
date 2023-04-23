import React from 'react';
import { useSelector } from 'react-redux';

const AdminAuth = ({ children }: any) => {
  const user = useSelector((state: any) => state.user.payload);
  console.log('user', user);
  if (user?.role === 'admin') {
    return children;
  }
  return <></>;
};

export default AdminAuth;

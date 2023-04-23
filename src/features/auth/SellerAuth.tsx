import React from 'react';
import { useSelector } from 'react-redux';

const SellerAuth = ({ children }: any) => {
  const User = useSelector((state: any) => state.user.payload);
  let isAuthorized = User?.isSeller;
  if (!isAuthorized) {
    return <></>;
  }
  return children;
};

export default SellerAuth;

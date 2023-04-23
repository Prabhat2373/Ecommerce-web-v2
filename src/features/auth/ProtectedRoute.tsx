import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = (props: any) => {
  const isLoggedIn = true;
  const token = 'token';
  const navigate = useNavigate();

  const checkUserToken = () => {
    if (!token) {
      return navigate('/login');
    }
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn, token]);
  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
};
export default ProtectedRoute;

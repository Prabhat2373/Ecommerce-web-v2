import React, { Suspense } from 'react';
import { Routes, Route, useRoutes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Nabar';
import Loading from './components/Loading';
import ProtectedRoute from './features/auth/ProtectedRoute';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {
  useGetAllCartQuery,
  useGetCurrentUserQuery,
  useGetProductsQuery,
} from './features/services/RTK/Api';
import { Products } from './features/Slices/ProductSlice';
import { User } from './features/Slices/AppSlice';
import { AllPages } from './routes/Route';
import { ToastContextProvider } from './features/Toast/ToastContext';
import AuthServices from './utils/Utils';
import { Cart } from './features/Slices/CartSlice';

function App() {
  const { getToken } = new AuthServices();
  const all_pages = useRoutes(AllPages());
  const UserEmail = String(window?.localStorage.getItem('user_email'));
  const { data: CurrentUser } = useGetCurrentUserQuery(UserEmail);
  const { data: CartItems } = useGetAllCartQuery(CurrentUser?.user?._id);
  console.log(CurrentUser);

  const dispatch = useDispatch();
  const { data: ProductPayload } = useGetProductsQuery('');
  console.log(ProductPayload);
  React.useEffect(() => {
    if (!getToken()) {
      console.log('not logged in');
    } else {
      dispatch(Products(ProductPayload?.products ?? []));
      dispatch(User(CurrentUser));
      dispatch(Cart(CartItems?.payload));
    }
  }, [ProductPayload, CurrentUser, dispatch]);
  return (
    <React.Fragment>
      <ToastContextProvider>{all_pages}</ToastContextProvider>
    </React.Fragment>
  );
}

export default App;

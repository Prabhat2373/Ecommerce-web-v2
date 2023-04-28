import React, { lazy } from 'react';
import AppLoader from './AppLoader';

export const Home = AppLoader(lazy(() => import('../../pages/Home')));

export const Login = AppLoader(
  lazy(() => import('../../pages/Register/Login'))
);
export const Register = AppLoader(
  lazy(() => import('../../pages/Register/Register'))
);

export const productView = AppLoader(
  lazy(() => import('../../pages/Products/ProductView'))
);

export const products = AppLoader(
  lazy(() => import('../../pages/Products/ProductsIndex'))
);

export const profile = AppLoader(
  lazy(() => import('../../pages/Admin/Profile'))
);

export const newOrder = AppLoader(
  lazy(() => import('../../pages/Orders/OrderIndex'))
);

export const orderSuccess = AppLoader(
  lazy(() => import('../../pages/payment/PaymentSuccess'))
);

export const Orders = AppLoader(
  lazy(() => import('../../pages/Orders/OrderList'))
);

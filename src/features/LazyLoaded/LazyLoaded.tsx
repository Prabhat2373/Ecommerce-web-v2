import React, { lazy } from 'react';
import AppLoader from './AppLoader';

export const Home = AppLoader(lazy(() => import('../../pages/Home')));

export const Login = AppLoader(
  lazy(() => import('../../pages/Register/Login'))
);
export const Register = AppLoader(
  lazy(() => import('../../pages/Register/Register'))
);

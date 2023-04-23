import { lazy } from 'react';
import AppLoader from '../features/LazyLoaded/AppLoader';

const Signup = AppLoader(lazy(() => import('../pages/Register/Register')));
const NotFound = AppLoader(lazy(() => import('../pages/Register/Login')));

export const publicRoutes = [
  {
    path: '/register',
    element: <Signup />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

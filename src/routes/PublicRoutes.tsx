import { lazy } from 'react';
import AppLoader from '../features/LazyLoaded/AppLoader';
import * as Lazyelement from '../../src/features/LazyLoaded/LazyLoaded';

const Signup = AppLoader(lazy(() => import('../pages/Register/Register')));
const NotFound = AppLoader(lazy(() => import('../pages/Not Found/NotFound')));

export const publicRoutes = [
  {
    path: '/register',
    element: <Signup />,
  },
  {
    path: '/login',
    exact: true,
    id: 'files',
    displayName: 'files',
    element: <Lazyelement.Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

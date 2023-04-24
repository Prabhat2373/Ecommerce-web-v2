import * as Lazyelement from '../../src/features/LazyLoaded/LazyLoaded';

import DashboardIcon from '../Assets/icons/EditIcon';

export const routes = [
  {
    path: '/',
    exact: true,
    id: 'dashboard',
    iconClass: DashboardIcon,
    displayName: 'Dashboard',
    element: <Lazyelement.Home />,
  },
  {
    path: '/login',
    exact: true,
    id: 'files',
    iconClass: DashboardIcon,
    displayName: 'files',
    element: <Lazyelement.Login />,
  },
  {
    path: '/view/:id',
    exact: true,
    id: 'files',
    iconClass: DashboardIcon,
    displayName: 'files',
    element: <Lazyelement.productView />,
  },
  {
    path: '/products',
    exact: true,
    id: 'files',
    iconClass: DashboardIcon,
    displayName: 'files',
    element: <Lazyelement.products />,
  },
];

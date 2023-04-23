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
    subMenu: [
      {
        path: '/user',
        exact: true,
        id: 'profile',
        element: <Lazyelement.Login />,
        displayName: 'profile',
        iconClass: DashboardIcon,
        isHidden: false,
      },
      {
        path: '/user/create',
        exact: true,
        id: 'user-create',
        element: <Lazyelement.Register />,
        displayName: 'profile Edit',
        isHidden: false,
      },
    ],
  },
  {
    path: '/login',
    exact: true,
    id: 'files',
    iconClass: DashboardIcon,
    displayName: 'files',
    element: <Lazyelement.Login />,
  },
];

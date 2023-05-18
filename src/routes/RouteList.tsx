import * as Lazyelement from "../../src/features/LazyLoaded/LazyLoaded";

import DashboardIcon from "../Assets/icons/EditIcon";

export const routes = [
  {
    path: "/",
    exact: true,
    id: "home",
    displayName: "home",
    element: <Lazyelement.Home />,
  },

  {
    path: "/view/:id",
    exact: true,
    id: "files",
    iconClass: DashboardIcon,
    displayName: "files",
    element: <Lazyelement.productView />,
  },
  {
    path: "/products",
    exact: true,
    id: "files",
    iconClass: DashboardIcon,
    displayName: "files",
    element: <Lazyelement.products />,
  },
  {
    path: "/product/create",
    exact: true,
    id: "files",
    iconClass: DashboardIcon,
    displayName: "files",
    element: <Lazyelement.ProductCreate />,
  },
  {
    path: "/profile",
    exact: true,
    id: "files",
    iconClass: DashboardIcon,
    displayName: "files",
    element: <Lazyelement.profile />,
  },
  {
    path: "/order/new",
    exact: true,
    id: "files",
    iconClass: DashboardIcon,
    displayName: "files",
    element: <Lazyelement.newOrder />,
  },
  {
    path: "/order-success",
    exact: true,
    id: "files",
    iconClass: DashboardIcon,
    displayName: "files",
    element: <Lazyelement.orderSuccess />,
  },
  {
    path: "/orders",
    exact: true,
    id: "files",
    iconClass: DashboardIcon,
    displayName: "files",
    element: <Lazyelement.Orders />,
  },
];

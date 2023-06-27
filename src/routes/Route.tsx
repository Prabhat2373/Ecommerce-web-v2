import { Outlet } from "react-router-dom";
import { publicRoutes } from "./PublicRoutes";
import { routes } from "./RouteList";
import ProtectedRoute from "../components/ProtectedRoute";
import AppLayout from "../layout/AppLayout";

export interface RouteListProps {
  id: string;
  path: string;
  exact?: boolean;
  element?: any;
  subMenu?: Array<AppRoutesProps>;
  displayName: string;
  iconClass?: JSX.Element;
  isHidden?: boolean;
}

interface AppRoutesProps {
  routeList: Array<RouteListProps>;
}

export const AllPages = () => {
  const childRoute = routes
    ?.map((list: any) => list?.subMenu)
    .flat()
    .filter(Boolean)
    .map(({ path, element }) => ({ path, element }));
  const parentRoute = routes
    ?.filter((element, i) => {
      if (element.element === undefined) {
        return false; // skip
      }
      return true;
    })
    .map(({ path, element }) => ({ path, element }));

  const all_routes = [
    {
      element: (
        <>
          {/* <ProtectedRoute> */}
          <AppLayout />
          {/* </ProtectedRoute> */}
        </>
      ),
      children: [...childRoute, ...parentRoute],
    },
    {
      element: (
        <ProtectedRoute>
          <Outlet />
        </ProtectedRoute>
      ),
    },
    ...publicRoutes,
  ];

  return all_routes;
};

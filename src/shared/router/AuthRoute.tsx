import { Navigate, Outlet } from "react-router-dom";

import { PATH } from "@/shared/constants";
import { getLocalStorage } from "@/shared/utils";

const AuthRoute = () => {
  const token = getLocalStorage("token");

  if (token) {
    return <Navigate to={PATH.licenses} replace />;
  }

  return <Outlet />;
};

export default AuthRoute;

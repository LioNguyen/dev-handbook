import { createBrowserRouter } from "react-router-dom";

import { AUTH_ROUTER, MAIN_ROUTER } from "@/shared/constants";
import { AuthRoute, ProtectedRoute } from "@/shared/router";

const router = createBrowserRouter([
  {
    element: <AuthRoute />,
    children: AUTH_ROUTER,
  },
  {
    element: <ProtectedRoute />,
    children: MAIN_ROUTER,
  },
]);

export { router };

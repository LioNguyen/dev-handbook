import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./routes";

export const router = createBrowserRouter([
  {
    // Main layout with authenticated routes
    element: <></>,
    children: [
      {
        path: ROUTES.HOME,
        element: <></>,
      },
    ],
  },
  {
    // Authentication layout (for login/register pages)
    element: <></>,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <></>,
      },
      // Add register, forgot password, etc.
    ],
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import { ROUTES } from "./routes";

export const router = createBrowserRouter([
  {
    // Main layout with authenticated routes
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
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

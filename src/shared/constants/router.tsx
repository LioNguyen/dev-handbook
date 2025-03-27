import { Navigate } from "react-router-dom";

import { AuthLayout, MainLayout } from "@/components/layout";
import { ICON, PAGE, PATH } from "@/shared/constants/common";
import { i18n } from "@/shared/locale";

const AUTH_ROUTER = [
  {
    element: <AuthLayout />,
    children: [],
  },
];

const MAIN_ROUTER = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];

const NAV_ITEMS = [
  { id: PAGE.licenses, title: i18n.t(`${PAGE.licenses}`), url: PATH.licenses, icon: ICON.licenses },
  { id: PAGE.products, title: i18n.t(`${PAGE.products}`), url: PATH.products, icon: ICON.products },
  { id: PAGE.fields, title: i18n.t(`${PAGE.fields}`), url: PATH.fields, icon: ICON.fields },
  { id: PAGE.users, title: i18n.t(`${PAGE.users}`), url: PATH.users, icon: ICON.users },
  { id: PAGE.audits, title: i18n.t(`${PAGE.audits}`), url: PATH.audits, icon: ICON.audits },
  // { id: PAGE.settings, title: i18n.t(`${PAGE.settings}`), url: PATH.settings, icon: ICON.settings },
];

export { AUTH_ROUTER, MAIN_ROUTER, NAV_ITEMS };

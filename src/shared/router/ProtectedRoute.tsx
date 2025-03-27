/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useGlobal } from "@/domains/global";
import { APP_EVENTS, PATH } from "@/shared/constants";
import { getLocalStorage } from "@/shared/utils";

const ProtectedRoute = () => {
  const token = getLocalStorage("token");

  const { closeAllModals, closeAllSheets } = useGlobal();
  const navigate = useNavigate();

  const handleUnauthorized = () => {
    closeAllModals();
    closeAllSheets();
    navigate(PATH.auth.login);
  };

  useEffect(() => {
    window.addEventListener(APP_EVENTS.UNAUTHORIZED, handleUnauthorized);

    return () => {
      window.removeEventListener(APP_EVENTS.UNAUTHORIZED, handleUnauthorized);
    };
  }, [navigate]);

  useEffect(() => {
    if (!token) {
      handleUnauthorized();
    }
  }, [token]);

  return <Outlet />;
};

export default ProtectedRoute;

import { useCallback, useMemo, useState } from "react";
import { IAuthContext } from "./Auth.types";

import { createContext } from "@/shared/utils";

const [Provider, useAuthContext] = createContext<IAuthContext>();

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState();

  const setAuthStore = useCallback((auth: any) => {
    setAuth(auth);
  }, []);

  const removeAuthStore = useCallback(() => {
    setAuth(undefined);
  }, []);

  const value = useMemo(
    () => ({
      authStore: auth,
      removeAuthStore,
      setAuthStore,
    }),
    [auth, removeAuthStore, setAuthStore],
  );

  return <Provider value={value}>{children}</Provider>;
};

export { AuthProvider, useAuthContext };

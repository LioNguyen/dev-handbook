import { useCallback, useMemo, useState } from "react";

import { createContext } from "@/shared/utils";
import { IUserContext, IUserItem } from "./User.types";

const [Provider, useUserContext] = createContext<IUserContext>();

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<IUserItem | undefined>();

  const setUserProfileStore = useCallback((user: IUserItem) => {
    setUserProfile(user);
  }, []);

  const removeUserStore = useCallback(() => {
    setUserProfile(undefined);
  }, []);

  const value = useMemo(
    () => ({
      userProfileStore: userProfile,
      removeUserStore,
      setUserProfileStore,
    }),
    [userProfile, removeUserStore, setUserProfileStore],
  );

  return <Provider value={value}>{children}</Provider>;
};

export { UserProvider, useUserContext };

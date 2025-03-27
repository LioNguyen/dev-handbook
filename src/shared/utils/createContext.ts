import type React from "react";
import { createContext as originCreateContext, useContext } from "react";

function createContext<T>(): [React.Provider<T>, () => T, React.Context<T>] {
  const context = originCreateContext<T>({} as T);

  return [context.Provider, () => useContext(context), context];
}

export { createContext };

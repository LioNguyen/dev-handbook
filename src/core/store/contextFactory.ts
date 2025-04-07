import { createContext as originCreateContext, useContext } from "react";

interface ContextPackage<T> {
  Provider: React.Provider<T>;
  useValue: () => T;
  context: React.Context<T>;
  displayName?: string;
}

function createContext<T>(domain: string, defaultValue?: T): ContextPackage<T> {
  const context = originCreateContext<T>(defaultValue as T);
  context.displayName = `${domain}Context`;

  const useValue = () => {
    const value = useContext(context);
    if (value === undefined && defaultValue === undefined) {
      throw new Error(`use${domain}Context must be used within a ${domain}Provider`);
    }
    return value;
  };

  return {
    Provider: context.Provider,
    useValue,
    context,
    displayName: context.displayName,
  };
}

export { createContext };

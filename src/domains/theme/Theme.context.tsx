import { FC, type PropsWithChildren, useEffect, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import { createContext } from "@/shared/utils";
import { TThemeContext, ThemeOptions } from "./Theme.types";
import { GlobalStyle } from "./Theme.styles";

const [Provider, useSystemTheme] = createContext<TThemeContext>();

const SystemThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<keyof typeof ThemeOptions>("light");

  const changeTheme = (updatedTheme: keyof typeof ThemeOptions) => {
    setTheme(updatedTheme);
    localStorage.setItem("theme", updatedTheme);
  };

  useEffect(() => {
    const activedTheme = localStorage.getItem("theme") as keyof typeof ThemeOptions;

    if (activedTheme) {
      setTheme(activedTheme);
    }
  }, []);

  useEffect(() => {
    const themeOptions = Object.values(ThemeOptions);
    const root = window.document.documentElement;

    root.classList.remove(...themeOptions);
    root.classList.add(theme);
  }, [theme]);

  return <Provider value={{ theme, changeTheme }}>{children}</Provider>;
};

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <SystemThemeProvider>
    <StyledThemeProvider theme={{}}>
      {/* styled-components styles */}
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  </SystemThemeProvider>
);

export { ThemeProvider, SystemThemeProvider, useSystemTheme };

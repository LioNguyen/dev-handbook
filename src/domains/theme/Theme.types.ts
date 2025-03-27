const ThemeOptions = {
  light: "light",
  dark: "dark",
} as const;

type TThemeContext = {
  theme: keyof typeof ThemeOptions;
  changeTheme: (theme: keyof typeof ThemeOptions) => void;
};

export { ThemeOptions };
export type { TThemeContext };

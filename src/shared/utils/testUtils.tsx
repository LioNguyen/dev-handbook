import { render } from "@testing-library/react";

import { ThemeProvider } from "@/domains/theme";

const renderWithTheme = (children: React.ReactNode) => render(<ThemeProvider>{children}</ThemeProvider>);

export { renderWithTheme };

import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import { GlobalProvider } from "@/domains/global";
import { ThemeProvider } from "@/domains/theme";
import { router } from "@/shared/router";
import { queryClient } from "@/shared/services/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GlobalProvider>
          <RouterProvider router={router} />
        </GlobalProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

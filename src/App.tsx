import { RouterProvider } from "react-router-dom";

import { router } from "@core/router";
import { CanvasProvider } from "@domains/canvas";

function App() {
  return (
    <CanvasProvider>
      <RouterProvider router={router} />
    </CanvasProvider>
  );
}

export default App;

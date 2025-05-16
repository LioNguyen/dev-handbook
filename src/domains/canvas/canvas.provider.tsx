import { ReactFlowProvider } from "@xyflow/react";
import { FC, ReactNode, useMemo, useState } from "react";

import { Provider } from "./canvas.context";

// Canvas provider component that uses ReactFlow hooks
const MainCanvasProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [activeCanvas, setActiveCanvas] = useState<"config" | "preview">("config");
  const [previewCanvasKey, setPreviewCanvasKey] = useState(null);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => {
    return {
      activeCanvas,
      setActiveCanvas,
      previewCanvasKey,
      setPreviewCanvasKey,
    };
  }, [activeCanvas, setActiveCanvas, previewCanvasKey, setPreviewCanvasKey]);

  return <Provider value={value}>{children}</Provider>;
};

// Export the wrapped provider with ReactFlow
const CanvasProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ReactFlowProvider>
      <MainCanvasProvider>{children}</MainCanvasProvider>
    </ReactFlowProvider>
  );
};

export { CanvasProvider };

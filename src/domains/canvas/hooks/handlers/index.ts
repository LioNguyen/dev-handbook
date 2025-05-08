// src/domains/canvas/hooks/handlers/index.ts
import { useNodeHandlers } from "./nodeHandlers";
import { useEdgeHandlers } from "./edgeHandlers";
import { useViewHandlers } from "./viewHandlers";
import { useHighlightHandlers } from "./highlightHandlers";
import { useSettingsHandlers } from "./settingsHandlers";
import { useChangeHandlers } from "./changeHandlers";

/**
 * Main hook to access all canvas handlers
 */
export function useCanvasHandlers() {
  const nodeHandlers = useNodeHandlers();
  const edgeHandlers = useEdgeHandlers();
  const viewHandlers = useViewHandlers();
  const highlightHandlers = useHighlightHandlers();
  const settingsHandlers = useSettingsHandlers();
  const changeHandlers = useChangeHandlers();

  return {
    // Node handlers
    ...nodeHandlers,

    // Edge handlers
    ...edgeHandlers,

    // View handlers
    ...viewHandlers,

    // Highlight handlers
    ...highlightHandlers,

    // Settings handlers
    ...settingsHandlers,

    // Change handlers
    ...changeHandlers,
  };
}

// Export all individual hooks for direct access if needed
export {
  useNodeHandlers,
  useEdgeHandlers,
  useViewHandlers,
  useHighlightHandlers,
  useSettingsHandlers,
  useChangeHandlers,
};

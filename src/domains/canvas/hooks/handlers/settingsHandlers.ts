// src/domains/canvas/hooks/handlers/settingsHandlers.ts
import { useCallback } from "react";
import { useCanvas } from "../../canvas.context";

export function useSettingsHandlers() {
  const { canvasSettings, setCanvasSettings } = useCanvas();

  /**
   * Updates canvas settings
   */
  const updateCanvasSettings = useCallback(
    (settings: Partial<typeof canvasSettings>) => {
      setCanvasSettings((prev) => ({
        ...prev,
        ...settings,
      }));
    },
    [setCanvasSettings],
  );

  return {
    updateCanvasSettings,
  };
}

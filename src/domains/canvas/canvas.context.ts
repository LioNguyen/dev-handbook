import { createContext } from "@core/store";
import { Dispatch, SetStateAction } from "react";

// Define the type for the keyToRender structure
export type KeyToRenderType = {
  node: string[];
  leaf?: KeyToRenderType;
};

// Define the exact shape of your context
interface CanvasContextValue {
  // Canvas state
  activeCanvas: "config" | "preview";
  setActiveCanvas: Dispatch<SetStateAction<"config" | "preview">>;

  // Preview canvas key
  previewCanvasKey: any; // Using 'any' as the original code had null type
  setPreviewCanvasKey: Dispatch<SetStateAction<any>>;
}

export const { Provider, useValue: useCanvas } = createContext<CanvasContextValue>("Canvas");

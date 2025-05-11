import { useMemo } from "react";
import { ReactFlowInstance } from "@xyflow/react";
import { extendReactFlowInstance, ExtendedReactFlowInstance } from "../utils/extendedFlowInstance";

export function useExtendedReactFlow(reactFlowInstance: ReactFlowInstance | null) {
  const extendedInstance = useMemo<ExtendedReactFlowInstance | null>(() => {
    return extendReactFlowInstance(reactFlowInstance);
  }, [reactFlowInstance]);

  return extendedInstance;
}

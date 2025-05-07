// 2. Undo/Redo Custom Hook Implementation

import { useCallback, useEffect, useState } from "react";
import { Edge, Node, useReactFlow } from "reactflow";

/**
 * Options for configuring the undo/redo hook
 */
type UseUndoRedoOptions = {
  maxHistorySize: number; // Maximum number of history states to keep
  enableShortcuts: boolean; // Whether to enable keyboard shortcuts
};

/**
 * Return type for the useUndoRedo hook
 */
type UseUndoRedo = (options?: UseUndoRedoOptions) => {
  undo: () => void; // Function to undo the last action
  redo: () => void; // Function to redo the last undone action
  takeSnapshot: () => void; // Function to save the current state
  canUndo: boolean; // Whether there are actions to undo
  canRedo: boolean; // Whether there are actions to redo
};

/**
 * Structure of a single history item storing nodes and edges
 */
type HistoryItem = {
  nodes: Node[];
  edges: Edge[];
};

/**
 * Default options for the undo/redo hook
 */
const defaultOptions: UseUndoRedoOptions = {
  maxHistorySize: 100,
  enableShortcuts: true,
};

/**
 * Custom hook that implements undo/redo functionality for React Flow
 * Based on the Redux undo/redo pattern: https://redux.js.org/usage/implementing-undo-history
 *
 * @param options Configuration options for history management
 * @returns Object with undo, redo functions and state indicators
 */
export const useUndoRedo: UseUndoRedo = ({
  maxHistorySize = defaultOptions.maxHistorySize,
  enableShortcuts = defaultOptions.enableShortcuts,
} = defaultOptions) => {
  console.log("Initializing useUndoRedo hook with options:", {
    maxHistorySize,
    enableShortcuts,
  });

  // Past states that can be restored with undo
  const [past, setPast] = useState<HistoryItem[]>([]);

  // Future states that can be restored with redo (after undo operations)
  const [future, setFuture] = useState<HistoryItem[]>([]);

  // Get ReactFlow utility functions
  const { setNodes, setEdges, getNodes, getEdges } = useReactFlow();

  /**
   * Takes a snapshot of the current graph state and saves it to history
   * This should be called before any action that modifies the graph
   */
  const takeSnapshot = useCallback(() => {
    console.log("Taking snapshot of current graph state");

    // Get current nodes and edges
    const currentNodes = getNodes();
    const currentEdges = getEdges();

    console.log(
      `Current state: ${currentNodes.length} nodes, ${currentEdges.length} edges`
    );

    // Add current state to past, limiting the history size
    setPast((past) => {
      const newPast = [
        ...past.slice(past.length - maxHistorySize + 1, past.length),
        { nodes: currentNodes, edges: currentEdges },
      ];
      console.log(`History updated: ${newPast.length} snapshots saved`);
      return newPast;
    });

    // Clear future states since we're creating a new branch of history
    setFuture([]);
    console.log("Future states cleared after taking new snapshot");
  }, [getNodes, getEdges, maxHistorySize]);

  /**
   * Undoes the last action by restoring the previous state
   */
  const undo = useCallback(() => {
    // Check if we have past states to restore
    if (past.length === 0) {
      console.log("Cannot undo: no past states available");
      return;
    }

    // Get the most recent past state
    const pastState = past[past.length - 1];
    console.log("Undoing to previous state:", pastState);

    // Remove the state we're going to from the past history
    setPast((past) => {
      const newPast = past.slice(0, past.length - 1);
      console.log(`Past history reduced to ${newPast.length} snapshots`);
      return newPast;
    });

    // Store current state in future history for potential redo
    const currentNodes = getNodes();
    const currentEdges = getEdges();

    setFuture((future) => {
      const newFuture = [
        ...future,
        { nodes: currentNodes, edges: currentEdges },
      ];
      console.log(`Future history expanded to ${newFuture.length} snapshots`);
      return newFuture;
    });

    // Restore the past state
    console.log(
      `Restoring state with ${pastState.nodes.length} nodes and ${pastState.edges.length} edges`
    );
    setNodes(pastState.nodes);
    setEdges(pastState.edges);
  }, [setNodes, setEdges, getNodes, getEdges, past]);

  /**
   * Redoes the last undone action by restoring a future state
   */
  const redo = useCallback(() => {
    // Check if we have future states to restore
    if (future.length === 0) {
      console.log("Cannot redo: no future states available");
      return;
    }

    // Get the most recent future state
    const futureState = future[future.length - 1];
    console.log("Redoing to future state:", futureState);

    // Remove the state we're going to from the future history
    setFuture((future) => {
      const newFuture = future.slice(0, future.length - 1);
      console.log(`Future history reduced to ${newFuture.length} snapshots`);
      return newFuture;
    });

    // Store current state in past history
    const currentNodes = getNodes();
    const currentEdges = getEdges();

    setPast((past) => {
      const newPast = [...past, { nodes: currentNodes, edges: currentEdges }];
      console.log(`Past history expanded to ${newPast.length} snapshots`);
      return newPast;
    });

    // Restore the future state
    console.log(
      `Restoring state with ${futureState.nodes.length} nodes and ${futureState.edges.length} edges`
    );
    setNodes(futureState.nodes);
    setEdges(futureState.edges);
  }, [setNodes, setEdges, getNodes, getEdges, future]);

  // Set up keyboard shortcuts for undo/redo
  useEffect(() => {
    if (!enableShortcuts) {
      console.log("Keyboard shortcuts disabled");
      return;
    }

    console.log("Setting up keyboard shortcuts for undo/redo");

    /**
     * Handle keyboard shortcuts:
     * - Ctrl/Cmd + Z: Undo
     * - Ctrl/Cmd + Shift + Z: Redo
     */
    const keyDownHandler = (event: KeyboardEvent) => {
      // Check for redo shortcut (Ctrl/Cmd + Shift + Z)
      if (
        event.key === "z" &&
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey
      ) {
        console.log("Keyboard shortcut detected: Redo");
        redo();
        return;
      }

      // Check for undo shortcut (Ctrl/Cmd + Z)
      if (event.key === "z" && (event.ctrlKey || event.metaKey)) {
        console.log("Keyboard shortcut detected: Undo");
        undo();
        return;
      }
    };

    // Add event listener for keyboard shortcuts
    document.addEventListener("keydown", keyDownHandler);

    // Remove event listener on cleanup
    return () => {
      console.log("Cleaning up keyboard shortcut listeners");
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [undo, redo, enableShortcuts]);

  // Return functions and state indicators
  return {
    undo,
    redo,
    takeSnapshot,
    canUndo: !past.length,
    canRedo: !future.length,
  };
};

export default useUndoRedo;

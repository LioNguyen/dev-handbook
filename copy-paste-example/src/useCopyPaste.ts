import { useState, useCallback, useEffect, useRef } from "react";
import {
  Node,
  useKeyPress,
  useReactFlow,
  getConnectedEdges,
  KeyCode,
  Edge,
  XYPosition,
  useStore,
} from "reactflow";

/**
 * Custom hook to enable copy/paste/cut functionality in React Flow
 *
 * Provides mechanisms to:
 * - Copy selected nodes and their connecting edges
 * - Cut selected nodes and their connecting edges
 * - Paste previously copied/cut nodes and edges
 *
 * @template NodeData Type of data stored in nodes
 * @template EdgeData Type of data stored in edges
 * @returns Object containing cut, copy, paste functions and buffered elements
 */
export function useCopyPaste<NodeData, EdgeData>() {
  // Track mouse position for paste operation
  const mousePosRef = useRef<XYPosition>({ x: 0, y: 0 });

  // Get the DOM node of the ReactFlow container
  const rfDomNode = useStore((state) => state.domNode);

  // Access to ReactFlow API
  const { getNodes, setNodes, getEdges, setEdges, project } = useReactFlow<
    NodeData,
    EdgeData
  >();

  // Buffers for copied/cut nodes and edges
  const [bufferedNodes, setBufferedNodes] = useState([] as Node<NodeData>[]);
  const [bufferedEdges, setBufferedEdges] = useState([] as Edge<EdgeData>[]);

  console.log("Copy/Paste hook initialized");

  /**
   * Initialize the copy/paste hook:
   * 1. Prevent native browser copy/paste/cut behavior within ReactFlow
   * 2. Track mouse position for use when pasting
   */
  useEffect(() => {
    const events = ["cut", "copy", "paste"];

    if (rfDomNode) {
      console.log("Setting up event listeners on ReactFlow DOM node");

      // Prevent default browser behavior for copy/paste events
      const preventDefault = (e: Event) => {
        console.log(`Preventing default browser ${e.type} behavior`);
        e.preventDefault();
      };

      // Track mouse position relative to ReactFlow container
      const onMouseMove = (event: MouseEvent) => {
        const bounds = rfDomNode.getBoundingClientRect();
        mousePosRef.current = {
          x: event.clientX - (bounds?.left ?? 0),
          y: event.clientY - (bounds?.top ?? 0),
        };
      };

      // Add event listeners
      for (const event of events) {
        rfDomNode.addEventListener(event, preventDefault);
      }
      rfDomNode.addEventListener("mousemove", onMouseMove);

      // Clean up event listeners on unmount
      return () => {
        console.log("Cleaning up event listeners");
        for (const event of events) {
          rfDomNode.removeEventListener(event, preventDefault);
        }
        rfDomNode.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, [rfDomNode]);

  /**
   * Copy selected nodes and their interconnecting edges to the buffer
   */
  const copy = useCallback(() => {
    console.log("Copy operation started");

    // Get all selected nodes
    const selectedNodes = getNodes().filter((node) => node.selected);
    console.log(`Found ${selectedNodes.length} selected nodes to copy`);

    // Get edges that connect selected nodes (excluding edges to external nodes)
    const selectedEdges = getConnectedEdges(selectedNodes, getEdges()).filter(
      (edge) => {
        const isExternalSource = selectedNodes.every(
          (n) => n.id !== edge.source
        );
        const isExternalTarget = selectedNodes.every(
          (n) => n.id !== edge.target
        );

        // Only include edges where both source and target are selected nodes
        return !(isExternalSource || isExternalTarget);
      }
    );
    console.log(`Found ${selectedEdges.length} edges to copy`);

    // Store copied elements in the buffer
    setBufferedNodes(selectedNodes);
    setBufferedEdges(selectedEdges);

    console.log("Copy operation completed");
  }, [getNodes, getEdges]);

  /**
   * Cut selected nodes and their interconnecting edges (copy + delete)
   */
  const cut = useCallback(() => {
    console.log("Cut operation started");

    // Get all selected nodes
    const selectedNodes = getNodes().filter((node) => node.selected);
    console.log(`Found ${selectedNodes.length} selected nodes to cut`);

    // Get edges that connect selected nodes (excluding edges to external nodes)
    const selectedEdges = getConnectedEdges(selectedNodes, getEdges()).filter(
      (edge) => {
        const isExternalSource = selectedNodes.every(
          (n) => n.id !== edge.source
        );
        const isExternalTarget = selectedNodes.every(
          (n) => n.id !== edge.target
        );

        // Only include edges where both source and target are selected nodes
        return !(isExternalSource || isExternalTarget);
      }
    );
    console.log(`Found ${selectedEdges.length} edges to cut`);

    // Store cut elements in the buffer
    setBufferedNodes(selectedNodes);
    setBufferedEdges(selectedEdges);

    // Remove cut nodes and edges from the graph
    setNodes((nodes) => nodes.filter((node) => !node.selected));
    setEdges((edges) => edges.filter((edge) => !selectedEdges.includes(edge)));

    console.log("Cut operation completed");
  }, [getNodes, setNodes, getEdges, setEdges]);

  /**
   * Paste previously copied/cut elements at the specified position
   * If no position is provided, uses current mouse position
   *
   * @param position Position to paste the elements, default is current mouse position
   */
  const paste = useCallback(
    (
      { x: pasteX, y: pasteY } = project({
        x: mousePosRef.current.x,
        y: mousePosRef.current.y,
      })
    ) => {
      console.log(`Paste operation started at position (${pasteX}, ${pasteY})`);

      if (bufferedNodes.length === 0) {
        console.log("Nothing to paste: buffer is empty");
        return;
      }

      // Find the minimum x and y coordinates of the copied nodes
      // This will be the reference point for positioning the pasted nodes
      const minX = Math.min(...bufferedNodes.map((s) => s.position.x));
      const minY = Math.min(...bufferedNodes.map((s) => s.position.y));
      console.log(`Original nodes positioned relative to (${minX}, ${minY})`);

      // Use timestamp to ensure unique IDs for pasted elements
      const now = Date.now();
      console.log(`Using timestamp ${now} for new element IDs`);

      // Create new nodes with updated positions and IDs
      const newNodes: Node<NodeData>[] = bufferedNodes.map((node) => {
        const id = `${node.id}-${now}`;
        const x = pasteX + (node.position.x - minX);
        const y = pasteY + (node.position.y - minY);

        console.log(`Creating new node: ${id} at position (${x}, ${y})`);

        return { ...node, id, position: { x, y } };
      });

      // Create new edges with updated source/target IDs
      const newEdges: Edge<EdgeData>[] = bufferedEdges.map((edge) => {
        const id = `${edge.id}-${now}`;
        const source = `${edge.source}-${now}`;
        const target = `${edge.target}-${now}`;

        console.log(`Creating new edge: ${id} from ${source} to ${target}`);

        return { ...edge, id, source, target };
      });

      // Add new nodes and edges to the graph, deselecting existing nodes
      setNodes((nodes) => [
        ...nodes.map((node) => ({ ...node, selected: false })),
        ...newNodes,
      ]);
      setEdges((edges) => [...edges, ...newEdges]);

      console.log("Paste operation completed");
    },
    [bufferedNodes, bufferedEdges, project, setNodes, setEdges]
  );

  // Set up keyboard shortcuts
  useShortcut(["Meta+x", "Ctrl+x"], cut);
  useShortcut(["Meta+c", "Ctrl+c"], copy);
  useShortcut(["Meta+v", "Ctrl+v"], paste);

  return { cut, copy, paste, bufferedNodes, bufferedEdges };
}

/**
 * Helper hook to run a callback when a keyboard shortcut is pressed
 * Ensures the callback only runs once per keypress
 *
 * @param keyCode The keyboard shortcut(s) to listen for
 * @param callback The function to execute when the shortcut is pressed
 */
function useShortcut(keyCode: KeyCode, callback: Function): void {
  // Track whether the callback was run to prevent repeated execution
  const [didRun, setDidRun] = useState(false);

  // Check if the specified keys are currently pressed
  const shouldRun = useKeyPress(keyCode);

  useEffect(() => {
    if (shouldRun && !didRun) {
      // First time keys are pressed - run the callback
      console.log(
        `Keyboard shortcut detected: ${
          Array.isArray(keyCode) ? keyCode.join(" or ") : keyCode
        }`
      );
      callback();
      setDidRun(true);
    } else if (!shouldRun && didRun) {
      // Keys have been released - reset so callback can run again next time
      setDidRun(false);
    }
  }, [shouldRun, didRun, callback, keyCode]);
}

export default useCopyPaste;

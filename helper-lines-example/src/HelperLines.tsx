// 2. Helper Lines Renderer Component
import { CSSProperties, useEffect, useRef } from "react";
import { ReactFlowState, useStore } from "reactflow";

/**
 * Style for the canvas element that displays helper lines
 * The canvas is positioned on top of React Flow but doesn't capture any mouse events
 */
const canvasStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  position: "absolute",
  zIndex: 10,
  pointerEvents: "none", // Important: allows interactions to pass through to nodes beneath
};

/**
 * Selector function to get required values from the ReactFlow store
 * - width/height: viewport dimensions
 * - transform: current viewport transformation (pan/zoom)
 */
const storeSelector = (state: ReactFlowState) => ({
  width: state.width,
  height: state.height,
  transform: state.transform,
});

/**
 * Props for the HelperLines component
 */
export type HelperLinesProps = {
  horizontal?: number; // Y-coordinate for horizontal helper line (flow coordinates)
  vertical?: number; // X-coordinate for vertical helper line (flow coordinates)
};

/**
 * Helper Lines Renderer Component
 *
 * Displays alignment guide lines when dragging nodes.
 * Uses a canvas element overlaid on top of React Flow to render the lines.
 *
 * @param horizontal Y-coordinate for horizontal line (or undefined if no line)
 * @param vertical X-coordinate for vertical line (or undefined if no line)
 */
function HelperLinesRenderer({ horizontal, vertical }: HelperLinesProps) {
  console.log("Rendering helper lines:", { horizontal, vertical });

  // Get viewport dimensions and transformation from ReactFlow
  const { width, height, transform } = useStore(storeSelector);
  console.log("Viewport dimensions:", { width, height, transform });

  // Reference to the canvas element
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Effect to draw the helper lines whenever relevant props change
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx || !canvas) {
      console.warn("Canvas context not available for helper lines");
      return;
    }

    // Handle high-DPI displays (retina screens)
    const dpi = window.devicePixelRatio;
    console.log(`Setting up canvas with DPI ${dpi}`);

    // Set canvas size accounting for device pixel ratio
    canvas.width = width * dpi;
    canvas.height = height * dpi;

    // Scale context to account for device pixel ratio
    ctx.scale(dpi, dpi);

    // Clear previous drawing
    ctx.clearRect(0, 0, width, height);

    // Set line style
    ctx.strokeStyle = "#0041d0"; // Blue color for helper lines
    ctx.lineWidth = 1;

    // Draw vertical helper line if provided
    if (typeof vertical === "number") {
      // Convert flow coordinates to screen coordinates using the transform
      const screenX = vertical * transform[2] + transform[0];
      console.log(
        `Drawing vertical line at x=${vertical} (screen x=${screenX.toFixed(
          2
        )})`
      );

      ctx.beginPath();
      ctx.moveTo(screenX, 0);
      ctx.lineTo(screenX, height);
      ctx.stroke();
    }

    // Draw horizontal helper line if provided
    if (typeof horizontal === "number") {
      // Convert flow coordinates to screen coordinates using the transform
      const screenY = horizontal * transform[2] + transform[1];
      console.log(
        `Drawing horizontal line at y=${horizontal} (screen y=${screenY.toFixed(
          2
        )})`
      );

      ctx.beginPath();
      ctx.moveTo(0, screenY);
      ctx.lineTo(width, screenY);
      ctx.stroke();
    }
  }, [width, height, transform, horizontal, vertical]);

  return (
    <canvas
      ref={canvasRef}
      className="react-flow__canvas"
      style={canvasStyle}
    />
  );
}

export default HelperLinesRenderer;

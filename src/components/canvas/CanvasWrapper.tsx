import "@xyflow/react/dist/style.css";
import { Eye, Layers } from "lucide-react";

import { useCanvas } from "@/domains/canvas";
import { cn } from "@/shared/utils";
import { Tabs, TabsList, TabsTrigger } from "@designSystem/components/ui/tabs";
import ConfigCanvas from "./configCanvas/ConfigCanvas";
import PreviewCanvas from "./previewCanvas/PreviewCanvas";
import "./styles.css";

/**
 * Main Canvas component with elegant tabs in the top right
 */
function CanvasWrapper() {
  const { activeCanvas, setActiveCanvas } = useCanvas();

  return (
    <div className="h-full w-full relative">
      {/* Canvas container */}
      <div className="h-full w-full relative overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 transition-all duration-300",
            activeCanvas === "config" ? "opacity-100 z-10" : "opacity-0 z-0",
          )}
        >
          <ConfigCanvas />
        </div>
        <div
          className={cn(
            "absolute inset-0 transition-all duration-300",
            activeCanvas === "preview" ? "opacity-100 z-10" : "opacity-0 z-0",
          )}
        >
          <PreviewCanvas />
        </div>
      </div>

      {/* Elegant Tab Controls - Positioned at the top right */}
      <div className="absolute top-4 right-4 z-20">
        <Tabs
          value={activeCanvas}
          onValueChange={(value) => setActiveCanvas(value as "config" | "preview")}
          className="w-auto"
        >
          <TabsList className="bg-background/90 backdrop-blur-sm border shadow-sm rounded-lg h-9 p-1 gap-1">
            <TabsTrigger
              value="config"
              className="bg-transparent! rounded-md data-[state=active]:bg-slate-200! data-[state=active]:shadow-sm px-3 h-7 text-sm flex items-center gap-1.5 hover:border-transparent! active:border-transparent! focus:outline-none!"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Config</span>
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="bg-transparent! rounded-md data-[state=active]:bg-slate-200! data-[state=active]:shadow-sm px-3 h-7 text-sm flex items-center gap-1.5 hover:border-transparent! active:border-transparent! focus:outline-none!"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Preview</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}

export default CanvasWrapper;

import React from "react";

import CanvasWrapper from "@/components/canvas/CanvasWrapper";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="h-screen w-screen">
        <CanvasWrapper />
      </div>
    </div>
  );
};

export default HomePage;

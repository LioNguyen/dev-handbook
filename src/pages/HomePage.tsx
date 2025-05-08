import React from "react";

import MainCanvas from "@/components/canvas/MainCanvas";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="h-screen w-screen">
        <MainCanvas />
      </div>
    </div>
  );
};

export default HomePage;

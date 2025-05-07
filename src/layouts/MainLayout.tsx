import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <div className="content-container">
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header";
import Sidebar from "../components/shared/Sidebar";

const AppLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow max-w-full">
        <Header />
        <main className="bg-colorBrand10 p-4 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AppLayout;

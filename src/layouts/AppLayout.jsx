import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const AppLayout = () => {
  return (
    <>
      <Header />

      <div className="flex">
        <SideBar />
        <main className="flex-grow border border-gray-200">
          <Outlet />
        </main>
      </div>
    </>
  );
};
export default AppLayout;

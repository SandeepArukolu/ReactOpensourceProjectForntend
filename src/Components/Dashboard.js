import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5">
        {/* <h4 className="text-2xl font-bold">Welcome to the Dashboard</h4> */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex gap-2 w-full h-full">
      <Sidebar />
      <div className="w-screen min-h-screen overflow-y-auto ml-20 p-5">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;

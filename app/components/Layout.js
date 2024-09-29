import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 max-h-screen overflow-y-auto">
        <Topbar />

        <main className="container mx-auto p-8 ">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

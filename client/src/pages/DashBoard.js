import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSideBar from "../components/DashSideBar";
import MemberDashProfile from "../components/MemberDashProfile"; // Import the required component
import DashUsers from "../components/DashUsers"; // Import the required component

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    // Extract the 'tab' query parameter from the URL
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="flex flex-col min-h-screen text-white md:flex-row">
      {/* Sidebar */}
      <div className="md:w-56">
        <DashSideBar className="custom-sidebar" />
      </div>

      {/* Content Area */}
      <div className="flex-1">
        {tab === "profile" && <MemberDashProfile />}
        {tab === "users" && <DashUsers />}
      </div>
    </div>
  );
};

export default Dashboard;

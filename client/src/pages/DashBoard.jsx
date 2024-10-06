import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSideBar from "../components/DashSideBar";
import MemberDashProfile from "../components/MemberDashProfile.jsx";
import DashUsers from "../components/DashUsers.jsx";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlparams = new URLSearchParams(location.search);
    const tabFromUrl = urlparams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <>
      <div className="flex flex-col min-h-screen text-white md:flex-row">
        <div className="md:w-56">
          {/* sidebae */}
          <DashSideBar className="custom-sidebar" /> {/* Apply CSS class */}
        </div>
        {/* profile.. */}
        {tab === 'profile' && <MemberDashProfile />}
        {/* users */}
        {tab === 'users' && <DashUsers />}
      </div>
    </>
  );
}
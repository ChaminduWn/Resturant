import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminDashSideBar from "../components/AdminDashSideBar.jsx";
import AdminDasAddEmp from "../components/AdminDashAddEmp.jsx";
import DashProfile from "../components/DashProfile.jsx";
import AdminDasManagers from "../components/AdminDashManager.jsx";
import Header from "../components/Header.jsx";
import MemberDashProfile from "../components/MemberDashProfile.jsx";
import DashUsers from "../components/DashUsers.jsx";
import DashboardComponent from "../components/DashboardComponent.jsx";
import SearchEmployee from "../components/SearchEmployee.jsx"; // Import missing component
import FoodCategoryForm from "../components/FoodCategoryForm.jsx";
import FoodCategoryList from "../components/FoodCategoryList.jsx";

export default function AdminDashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [empId, setEmpId] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    const empIdFromUrl = urlParams.get("empId");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }

    if (empIdFromUrl) {
      setEmpId(empIdFromUrl);
    }
  }, [location.search]);

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col md:flex-row bg-[#d4d4d4]">
        <div className="md:w-56">
          <AdminDashSideBar />
        </div>

        {/* Conditional Rendering based on the tab value */}
        <div className="flex-1 p-4">
          {tab === "admin-users" && <DashUsers />}
          {tab === "dashboard-comp" && <DashboardComponent />}
          {tab === "search-employee" && <SearchEmployee empId={empId} />}
          {tab === "addemployee" && <AdminDasAddEmp />}
          {tab === "profile" && <DashProfile />}
          {tab === "member-profile" && <MemberDashProfile />}
          {tab === "admin-managers" && <AdminDasManagers />}
          {tab === "add-foods" && <FoodCategoryForm />}
          {tab === "view-foods" && <FoodCategoryList />}
          


        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminDashSideBar from "../components/AdminDashSideBar.jsx";
import AdminDasAddEmp from "../components/AdminDashAddEmp.jsx";
import DashProfile from "../components/DashProfile.jsx";
import AdminDasManagers from "../components/AdminDashManager.jsx";
import MemberDashProfile from "../components/MemberDashProfile.jsx";
import DashUsers from "../components/DashUsers.jsx";
import DashboardComponent from "../components/DashboardComponent.jsx";
import SearchEmployee from "../components/SearchEmployee.jsx"; 
import FoodCategoryForm from "../components/FoodCategoryForm.jsx";
import FoodCategoryList from "../components/FoodCategoryList.jsx";
import PaymentManager from "../components/PaymentManager.jsx";

export default function AdminDashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [empId, setEmpId] = useState("");
  const [foodCategoryId, setFoodCategoryId] = useState(""); // New state for food category ID

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    const empIdFromUrl = urlParams.get("empId");
    const foodCategoryIdFromUrl = urlParams.get("foodCategoryId"); // Capture food category ID from URL

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }

    if (empIdFromUrl) {
      setEmpId(empIdFromUrl);
    }

    if (foodCategoryIdFromUrl) {
      setFoodCategoryId(foodCategoryIdFromUrl); // Store the food category ID
    }
  }, [location.search]);

  return (
    <>

      <div className="min-h-screen flex flex-col md:flex-row bg-[#d4d4d4]">
        <div className="md:w-56">
          <AdminDashSideBar />
        </div>

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

          {tab === "payment-manager" && <PaymentManager />}



          
       
        </div>
      </div>
    </>
  );
}

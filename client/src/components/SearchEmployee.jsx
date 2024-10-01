import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Select, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import EmployeeCard from "../components/EmployeeCard.jsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function SearchEmployee() {
  const [totalManagers, setTotalManagers] = useState(0);
  const [lastMonthManagers, setLastMonthManagers] = useState(0); 
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    sort: "desc",
    role: "",
  });
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  console.log(sideBarData);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const roleFromUrl = urlParams.get("role");
    const startIndexFromUrl = parseInt(urlParams.get("startIndex")) || 0;
    if (searchTermFromUrl || sortFromUrl || roleFromUrl) {
      setSearchTerm(searchTermFromUrl);
      setSideBarData({
        ...sideBarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        role: roleFromUrl,
      });
    }
    setStartIndex(startIndexFromUrl);

    const fetchManagers = async () => {
        const res = await fetch(`/api/employee/getemployee?role=Manager&limit=5`);
        const data = await res.json();
        if (res.ok) {
          setTotalManagers(data.totalEmployees);
          setLastMonthManagers(data.lastMonthEmployees);
        }
      };

    
    const fetchEmployee = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/employee/getemployee?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setEmployee(data.employees);
      
        setLoading(false);
        if (data.employees.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchEmployee();
    fetchInstructors();
    fetchManagers();
  }, [location.search]);



  const handleChange = (e) => {
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSideBarData({ ...sideBarData, sort: order });
    }

    if (e.target.id === "role") {
      const role = e.target.value || "";
      setSideBarData({ ...sideBarData, role: role });
    }
  };

  const handleShowMore = async () => {
    const numberOfEmp = employee.length;
    const startIndex = numberOfEmp;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/employee/getemployee?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setEmployee([...employee, ...data.employees]);
      if (data.employees.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  const generateUserReport = () => {
    const doc = new jsPDF();

    // Set left margin
    const leftMargin = 80;
    const leftMargin1 = 50;

    // Print the title
    doc.text('CJ GYM & Fitness Center Employee Report', leftMargin1, 20);

    // Print total user count
    doc.text(`Total Employees: ${totalManagers}`, leftMargin, 30);
    doc.text(`Total Manager: ${totalManagers}`, leftMargin, 40);
    const tableData = employee.map((employee) => [
      new Date(employee.createdAt).toLocaleDateString(),
      employee.firstname + " " + employee.lastname,
      employee.username,
      employee.address,
      employee.email,
      employee.nic,
      employee.phone,
      employee.role,
      // user.isAdmin ? 'Yes' : 'No',
    ]);
    doc.autoTable({
      head: [
        [
          "Registered Date",
          "Name",
          "username",
          "Address",
          "email",
          "nic",
          "phone",
          "role",
          
        ],
      ],
      body: tableData,
      startY:60 
    });
    doc.save("employee_report.pdf");
  };

  return (
    <div className="flex flex-col w-full md:flex-row">
      <div className="p-5 border-b border-gray-500 md:border-r md:min-h-screen md:w-1/3">
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6">
          <div className="flex items-center gap-2">
            <label htmlFor="" className="font-semibold whitespace-nowrap">
              Search:
            </label>
            <TextInput
              type="text"
              placeholder="Search..."
              rightIcon={AiOutlineSearch}
              className="w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="" className="font-semibold">
              Sort:
            </label>
            <Select
              onChange={handleChange}
              defaultValue={sideBarData.sort}
              id="sort"
              className="w-full"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="" className="font-semibold">
              Role:
            </label>
            <Select
              onChange={handleChange}
              defaultValue={sideBarData.role}
              id="role"
              className="w-full"
            >
              <option value="">Select Role</option>
              <option value="Manager">Managers</option>
            </Select>
          </div>
          <button
            type="submit"
            className="border-2 border-[#a80000] rounded-md p-2 hover:bg-[#a80000] hover:text-white"
          >
            Search
          </button>
          <button
            onClick={generateUserReport}
            className="border-2 border-[#1f1f1f] rounded-md p-2 hover:bg-[#1f1f1f] hover:text-white"
          >
            Download Employee List
          </button>
        </form>
      </div>
      <p className="hidden mb-4 text-center text-gray-700 text-m dark:text-gray-800">
        Total Employees: {totalManagers} 
    
      </p>
      <p className="hidden mb-4 text-center text-gray-700 text-m dark:text-gray-800">
        Total Manager: {totalManagers}
    
      </p>
     
      <div className="w-full">
        <h1 className="p-3 mt-5 text-3xl font-semibold border-gray-500 sm:border-b">
          Employee results
        </h1>
        <div className="flex flex-wrap gap-4 p-7">
          {!loading && employee.length === 0 && (
            <p className="text-xl text-gray-500">No employee found.</p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading &&
            employee &&
            employee.map((emp) => (
              <EmployeeCard key={emp._id} employee={emp} />
            ))}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-lg text-teal-500 hover:underline p-7"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
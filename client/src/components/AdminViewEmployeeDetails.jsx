import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Header from "./Header";
import AdminDashSideBar from "./AdminDashSideBar";
import EmployeeContact from "./EmployeeContact";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export default function AdminViewEmployeeDetails() {
  const location = useLocation();
  const { empId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/employee/getemployee?empId=${empId}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setEmployee(data.employees[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [empId]);


  const generatePDF = () => {
    const employeeDetails = document.getElementById("employeeDetails");
    const pdf = new jsPDF("p", "mm", "a4");

    // Convert HTML element to canvas using html2canvas
    html2canvas(employeeDetails).then((canvas) => {
      // Add canvas to PDF
      const imgData = canvas.toDataURL("image/png/jpg");
      const imgWidth = 210; // A4 width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      
      // Download PDF
      pdf.save("employee_report.pdf");
    });
  };
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col md:flex-row bg-[#d4d4d4]" id="employeeDetails">
        <div className="md:w-56">
          <AdminDashSideBar />
        </div>
        <div className="flex-grow w-full min-h-[60vh] bg-[#d4d4d4] p-10 md:p-20 justify-center" id="employeeDetails">
          <div className="max-w-[600px] mx-auto rounded-md p-10 bg-white shadow-lg">
            <div className="flex items-center justify-center">
              <img
                src={employee && employee.profilePicture}
                alt={employee && employee.username}
                className="object-cover object-center w-32 h-32 mt-10 border-4 rounded-full shadow-md"
              />
            </div>
            <div className="flex flex-col p-2 mt-5">
              <div className="mb-5 text-center">
                <h1 className="text-2xl font-bold uppercase">
                  {employee && employee.firstname}{" "}
                  {employee && employee.lastname}
                </h1>
              </div>
              <div className="flex flex-row justify-between">
                <p>Username:</p>
                <p className="font-semibold">{employee && employee.username}</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>Role:</p>
                <p className="font-semibold">{employee && employee.role}</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>Email:</p>
                <p className="font-semibold">{employee && employee.email}</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>NIC:</p>
                <p className="font-semibold">{employee && employee.nic}</p>
              </div>

              <div className="flex flex-row justify-between">
                <p>Phone:</p>
                <p className="font-semibold">{employee && employee.phone}</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>Address:</p>
                <p className="font-semibold">{employee && employee.address}</p>
              </div>
              
            </div>
            <div className="flex flex-col items-center justify-center">
              <button onClick={generatePDF}>Report</button>
              <button
                onClick={() => setContact(true)}
                className="bg-[#1f1f1f] text-white rounded-lg uppercase hover:opacity-80 p-2"
              >
                Contact
              </button>
              {contact && <EmployeeContact employee={employee} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EmployeeContact({ employee }) {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [employeeDetails, setEmployeeDetails] = useState(null);
    useEffect(
        () => {
          const fetchEmployee = async () => {
            try {
             
              setLoading(true);
              const res = await fetch(`/api/employee/getemployee?empId=${employee._id}`);
              const data = await res.json();
              if (!res.ok) {
                setError(true);
                setLoading(false);
                return;
              }
              if (res.ok) {
                setEmployeeDetails(data.employees[0]);
                setLoading(false);
                setError(false);
              }
            } catch (error) {
              setError(true);
              setLoading(false);
            }
          };
          fetchEmployee();
        },[employee._id],);

        const onChange = (e) => {
            setMessage(e.target.value);
        }
  return (
    <>
        { employeeDetails && (
            <div className="flex flex-col">
            <p>
              Contact <span className="font-semibold">
              {employeeDetails.firstname.toLowerCase()} {employeeDetails.lastname.toLowerCase()}</span>
            </p>
            <textarea name="message" id="message" cols="50" rows="5" value={message}
            onChange={onChange} placeholder="Enter your message here..."
            className="w-full p-3 border rounded-lg">
  
            </textarea>
            <Link to={`mailto:${employeeDetails.email}?subject=
            &body=${message}`}
            className="bg-[#707070] text-white text-center p-3 rounded-lg uppercase hover:opacity-80 mt-1">
              Send Message
            </Link>
          </div>
        )
        }
    </>
  )
}
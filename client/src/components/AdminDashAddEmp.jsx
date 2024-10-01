import { Alert, Spinner } from "flowbite-react"; 
import { useSnackbar } from "notistack"; // Ensure this is from 'notistack'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDasAddEmp() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Access snackbar here
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all required fields
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.address ||
      !formData.phone ||
      !formData.email ||
      !formData.nic ||
      formData.role === "Select the role" || // Check role selection
      !formData.role
    ) {
      return enqueueSnackbar("All fields are required", { variant: "error" });
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/authemployee/create", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setSuccess(null);
        return enqueueSnackbar(data.message, { variant: "error" });
      }

      setLoading(false);
      if (res.ok) {
        enqueueSnackbar("Employee added successfully", { variant: "success" });
        navigate("/admin-dashboard");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setSuccess(null);
    }
  };

  return (
    <div className="flex-grow w-full min-h-[60vh] bg-[#d4d4d4] p-10 md:p-20 justify-center">
      <div className=" max-w-[600px] mx-auto rounded-md p-10 bg-white shadow-lg">
        <div className="flex flex-col mb-2">
          <h3 className="text-2xl font-semibold mb-4 text-[#03001C] text-center">
            Employee Registration
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex flex-col justify-between md:flex-row">
              <div className="flex flex-col">
                <label htmlFor="firstname" className="text-[#1f1f1f] mt-3">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  className="text-[#1f1f1f] text-sm py-2 my-2 rounded-md bg-[#d4d4d4] focus:outline-none placeholder:text-[#1f1f1f] focus:ring-[#03001C]"
                  id="firstname"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="lastname" className="text-[#1f1f1f] mt-3">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  className="text-[#1f1f1f] text-sm py-2 my-2 rounded-md bg-[#d4d4d4] focus:outline-none placeholder:text-[#1f1f1f] focus:ring-[#03001C]"
                  id="lastname"
                  onChange={handleChange}
                />
              </div>
            </div>

            <label htmlFor="address" className="text-[#1f1f1f] mt-3">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter address"
              className="text-[#1f1f1f] text-sm py-2 my-2 rounded-md bg-[#d4d4d4] focus:outline-none placeholder:text-[#1f1f1f] focus:ring-[#03001C]"
              id="address"
              onChange={handleChange}
            />
            <label htmlFor="email" className="text-[#1f1f1f] mt-3">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="text-[#1f1f1f] text-sm py-2 my-2 rounded-md bg-[#d4d4d4] focus:outline-none placeholder:text-[#1f1f1f] focus:ring-[#03001C]"
              id="email"
              onChange={handleChange}
            />

            <div className="flex flex-col justify-between sm:flex-row">
              <div className="flex flex-col">
                <label htmlFor="nic" className="text-[#1f1f1f] mt-3">
                  NIC
                </label>
                <input
                  type="text"
                  placeholder="Enter NIC"
                  className="text-[#1f1f1f] text-sm py-2 my-2 rounded-md bg-[#d4d4d4] focus:outline-none placeholder:text-[#1f1f1f] focus:ring-[#03001C]"
                  id="nic"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="phone" className="text-[#1f1f1f] mt-3">
                  Phone number
                </label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  className="text-[#1f1f1f] text-sm py-2 my-2 rounded-md bg-[#d4d4d4] focus:outline-none placeholder:text-[#1f1f1f] focus:ring-[#03001C]"
                  id="phone"
                  onChange={handleChange}
                />
              </div>
            </div>

            <label htmlFor="role" className="text-[#1f1f1f] mt-3">
              Role
            </label>
            <select
              className="mt-3 rounded-md bg-[#d4d4d4] text-[#1f1f1f]"
              id="role"
              value={formData.role || ""}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option>Select the role</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <div className="flex flex-col my-4">
            <button
              type="submit"
              className="flex items-center justify-center p-3 my-2 text-sm text-center text-white border border-white rounded-md cursor-pointer bg-cyan-600 hover:bg-cyan-900"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Add Employee"
              )}
            </button>
          </div>
        </form>

        {error && (
          <Alert className="p-2 mt-5" color="failure">
            {error}
          </Alert>
        )}

        {success && (
          <Alert className="p-2 mt-5" color="success">
            {success}
          </Alert>
        )}
      </div>
    </div>
  );
}

import { Modal, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export default function AdminDasManagers() {
  const { currentUser } = useSelector((state) => state.user);
  const [employees, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [empIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(`/api/employee/getemployee?role=Manager`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.employees);
          if (data.employees.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchEmployees();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = employees.length;
    try {
      const res = await fetch(
        `/api/employee/getemployee?role=Manager&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.employees]);
        if (data.employees.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteEmployee = async () => {
    try {
      const res = await fetch(`/api/employee/deleteemployee/${empIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) =>
          prev.filter((employee) => employee._id !== empIdToDelete)
        );
        enqueueSnackbar("Manager deleted successfully", { variant: "success" });
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 overflow-x-scroll table-auto md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <h1 className="m-5 text-2xl font-bold text-center uppercase">Managers</h1>
      {currentUser.isAdmin && employees.length > 0 ? (
        <>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-3 py-3">
                    Date of register
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Profile picture
                  </th>
                  <th scope="col" className="px-3 py-3">
                    First name
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Last name
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-3">
                    NIC
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={employee._id}
                  >
                    <td className="px-3 py-4">
                      {new Date(employee.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/view-employee-details/${employee._id}`}>
                        <img
                          src={employee.profilePicture}
                          alt={employee.username}
                          className="object-cover w-10 h-10 bg-gray-500 rounded-full"
                        />
                      </Link>
                    </td>
                    <td className="px-3 py-4">{employee.firstname}</td>
                    <td className="px-3 py-4">{employee.lastname}</td>
                    <td className="px-3 py-4">{employee.username}</td>
                    <td className="px-4 py-4">{employee.address}</td>
                    <td className="px-4 py-4">{employee.email}</td>
                    <td className="px-4 py-4">{employee.nic}</td>
                    <td className="px-4 py-4">{employee.phone}</td>
                    <td className="px-4 py-4">
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setUserIdToDelete(employee._id);
                        }}
                        className="font-medium text-red-500 cursor-pointer hover:underline"
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="self-center w-full text-sm text-teal-500 py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no managers yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="red"
                className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300"
                onClick={handleDeleteEmployee}
              >
                Yes, I'm sure
              </Button>
              <Button
                color="gray"
                className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300"
                onClick={() => setShowModal(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

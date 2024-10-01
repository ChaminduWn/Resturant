import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export default function AdminDasManagers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [empIdToDelete, setEmpIdToDelete] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/employee/getemployee?role=Manager`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.employees);
          if (data.employees.length < 9) {
            setShowMore(false);
          }
        } else {
          enqueueSnackbar(`Failed to fetch employees: ${data.message}`, { variant: "error" });
        }
      } catch (error) {
        enqueueSnackbar(`Error fetching employees: ${error.message}`, { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    if (currentUser.isAdmin) {
      fetchEmployees();
    }
  }, [currentUser.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/employee/getemployee?role=Manager&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.employees]);
        if (data.employees.length < 9) {
          setShowMore(false);
        }
      } else {
        enqueueSnackbar(`Failed to fetch more employees: ${data.message}`, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(`Error fetching more employees: ${error.message}`, { variant: "error" });
    }
  };

  const handleDeleteEmployee = async () => {
    try {
      const res = await fetch(`/api/employee/deleteemployee/${empIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((employee) => employee._id !== empIdToDelete));
        enqueueSnackbar("Manager deleted successfully", { variant: "success" });
        setShowModal(false);
      } else {
        enqueueSnackbar(`Failed to delete employee: ${data.message}`, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(`Error deleting employee: ${error.message}`, { variant: "error" });
    }
  };

  return (
    <div className="p-3 overflow-x-auto md:mx-auto scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <h1 className="m-5 text-2xl font-bold text-center uppercase">Managers</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {currentUser.isAdmin && users.length > 0 ? (
            <>
              <Table hoverable className="w-full shadow-md table-auto">
                <Table.Head>
                  {["Date of register", "Profile picture", "First name", "Last name", "Username", "Address", "Email", "NIC", "Phone", "Delete"].map((header) => (
                    <Table.HeadCell className="bg-[#fcfafa] text-[#0a0a0a]" key={header}>
                      {header}
                    </Table.HeadCell>
                  ))}
                </Table.Head>
                <Table.Body className="divide-y">
                  {users.map((employee) => (
                    <Table.Row key={employee._id} className="bg-white dark:border-gray-700 dark:bg-gray-800 text-[#1f1f1f]">
                      <Table.Cell>{new Date(employee.createdAt).toLocaleDateString()}</Table.Cell>
                      <Table.Cell>
                        <Link to={`/view-employee-details/${employee._id}`}>
                          <img
                            src={employee.profilePicture}
                            alt={employee.username}
                            className="object-cover w-10 h-10 bg-gray-500 rounded-full"
                          />
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{employee.firstname}</Table.Cell>
                      <Table.Cell>{employee.lastname}</Table.Cell>
                      <Table.Cell>{employee.username}</Table.Cell>
                      <Table.Cell>{employee.address}</Table.Cell>
                      <Table.Cell>{employee.email}</Table.Cell>
                      <Table.Cell>{employee.nic}</Table.Cell>
                      <Table.Cell>{employee.phone}</Table.Cell>
                      <Table.Cell>
                        <span
                          onClick={() => {
                            setShowModal(true);
                            setEmpIdToDelete(employee._id);
                          }}
                          className="font-medium text-red-500 cursor-pointer hover:underline"
                        >
                          Delete
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
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
            <p>No managers found!</p>
          )}
        </>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteEmployee}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

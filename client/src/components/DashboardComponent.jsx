import { useEffect, useState } from "react";
import { HiArrowNarrowUp } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "flowbite-react";

export default function DashboardComponent() {
  const [managers, setManagers] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalManagers, setTotalManagers] = useState(0);
  const [lastMonthManagers, setLastMonthManagers] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  const dataFormatter = (number) =>
    Intl.NumberFormat("us").format(number).toString();

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await fetch(`/api/employee/getemployee?role=Manager&limit=5`);
        const data = await res.json();
        if (res.ok) {
          setManagers(data.employees);
          setTotalManagers(data.totalEmployees);
          setLastMonthManagers(data.lastMonthEmployees);
        } else {
          console.error("Failed to fetch managers");
        }
      } catch (error) {
        console.error("Error fetching managers:", error.message);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchManagers();
      fetchUsers();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex flex-wrap justify-center gap-4">
        {/* Total Managers */}
        <div className="flex flex-col justify-between w-full gap-4 p-3 bg-white rounded-md shadow-md md:w-72">
          <div className="flex justify-between">
            <div>
              <h3 className="text-[#1f1f1f] text-md uppercase">Total Managers</h3>
              <p className="text-2xl font-semibold">{totalManagers}</p>
            </div>
            <FaUserTie className="p-3 text-5xl text-white rounded-full shadow-lg bg-blue-950" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              <HiArrowNarrowUp />
              <p>{lastMonthManagers}</p>
            </span>
            <div className="text-[#707070]">Last month</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 py-3 mx-auto">
        {/* Managers List */}
        <Card className="w-full sm:max-w-72">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Managers
            </h5>
            <Link to={"/admin-dashboard?tab=admin-managers"}>
              <p className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                View all
              </p>
            </Link>
          </div>
          <div className="flow-root">
            {managers.map((manager) => (
              <ul
                className="border-b-2 divide-y divide-gray-200 dark:divide-gray-700"
                key={manager._id}
              >
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      <img
                        alt="Profile"
                        height="32"
                        src={manager.profilePicture}
                        width="32"
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {manager.firstname} {manager.lastname}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {manager.email}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            ))}
          </div>
        </Card>

        {/* Users List */}
        <Card className="w-full sm:max-w-72">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Latest Members
            </h5>
            <Link to={"/admin-dashboard?tab=admin-users"}>
              <p className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                View all
              </p>
            </Link>
          </div>
          <div className="flow-root">
            {users.map((user) => (
              <ul
                className="border-b-2 divide-y divide-gray-200 dark:divide-gray-700"
                key={user._id}
              >
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      <img
                        alt="Profile"
                        height="32"
                        src={user.profilePicture}
                        width="32"
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

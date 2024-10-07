import { Modal, Button, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const fetchUsersBySearch = async () => {
      try {
        const res = await fetch(`/api/user/getusers?search=${searchQuery}`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setShowMore(data.users.length >= 9);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchUserById = async () => {
      try {
        const res = await fetch(`/api/user/getusers?userId=${userId}`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users[0]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUsersBySearch();
    fetchUserById();
  }, [searchQuery, userId]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
        setDeleteMessage('User deleted successfully');
      } else {
        setDeleteMessage('Error deleting user. Please try again.');
      }
    } catch (error) {
      setDeleteMessage(`Error: ${error.message}`);
      console.log(error.message);
    } finally {
      // Resetting the modal state after the operation
      setUserIdToDelete('');
      setShowModal(false);
    }
  };

  const generateUserReport = () => {
    const doc = new jsPDF();
    const tableData = users.map((user) => [
      new Date(user.createdAt).toLocaleDateString(),
      user.username,
      user.email,
      user.contactNumber,
      user.address,
    ]);
    doc.autoTable({
      head: [['Date created', 'Username', 'Email', 'Phone Number', 'Address']],
      body: tableData,
    });
    doc.save('user_report.pdf');
  };

  return (
    <div className='p-3 overflow-x-scroll'>
      <div className="flex items-center justify-between mb-4">
        <Button onClick={generateUserReport} className="mr-2">Generate User Report</Button>
        <TextInput
          type="text"
          placeholder="Search by username..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-64"
        />
      </div>
      {currentUser.isAdmin && users.length > 0 ? (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Date created</th>
                <th scope="col" className="px-6 py-3">User image</th>
                <th scope="col" className="px-6 py-3">Username</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Phone Number</th>
                <th scope="col" className="px-6 py-3">Address</th>
                <th scope="col" className="px-6 py-3">Admin</th>
                <th scope="col" className="px-6 py-3">View</th>
                <th scope="col" className="px-6 py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user._id}>
                  <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className='object-cover w-10 h-10 bg-gray-500 rounded-full'
                    />
                  </td>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.contactNumber}</td>
                  <td className="px-6 py-4">{user.address}</td>
                  <td className="px-6 py-4">
                    {user.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-black' />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      onClick={() => navigate(`/member-view/${user._id}`)}
                      className='font-medium text-green-500 cursor-pointer hover:underline'
                    >
                      View
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className='font-medium text-red-500 cursor-pointer hover:underline'
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='self-center w-full text-sm text-teal-500 py-7'
            >
              Show more
            </button>
          )}
        </div>
      ) : (
        <p>You have no users yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 text-red-400 h-14 w-14 dark:text-gray-200' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this user?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='red' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
          {deleteMessage && <p className="mt-4 text-center text-red-500">{deleteMessage}</p>}
        </Modal.Body>
      </Modal>
    </div>
  );
}

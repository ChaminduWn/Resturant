import { Modal, Table, Button, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
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
  const location = useLocation();

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
        setLoading(true);
        const res = await fetch(`/api/user/getusers?userId=${userId}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setUsers(data.users[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
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
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
        setDeleteMessage('User deleted successfully');
      } else {
        setDeleteMessage('Error deleting user');
        console.log(data.message);
      }
    } catch (error) {
      setDeleteMessage('Error deleting user');
      console.log(error.message);
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
      // user.isAdmin ? 'Yes' : 'No',
    ]);
    doc.autoTable({
      head: [['Date created', 'Username', 'Email', 'Phone Number', 'Address', 'Admin']],
      body: tableData,
    });
    doc.save('user_report.pdf');
  };

  return (
    <div className='p-3 overflow-x-scroll table-auto md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
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
      {deleteMessage && (
        <div className="relative px-4 py-3 mb-4 text-green-700 bg-green-100 border border-green-400 rounded" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> {deleteMessage}</span>
        </div>
      )}
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Phone Number</Table.HeadCell>
              <Table.HeadCell>Address</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>View</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body className='divide-y' key={user._id}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className='object-cover w-10 h-10 bg-gray-500 rounded-full'
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.contactNumber}</Table.Cell>
                  <Table.Cell>{user.address}</Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-black' />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => navigate(`/member-view/${user._id}`)}
                      className='font-medium text-green-500 cursor-pointer hover:underline'
                    >
                      View
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className='font-medium text-red-500 cursor-pointer hover:underline'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='self-center w-full text-sm text-teal-500 py-7'
            >
              Show more
            </button>
          )}
        </>
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
            <HiOutlineExclamationCircle className='mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this user?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

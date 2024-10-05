import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { HiArrowSmRight, HiOutlineUserGroup } from 'react-icons/hi';
import { Sidebar } from 'flowbite-react';

export default function DashSideBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState('');
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const urlparams = new URLSearchParams(location.search);
    const tabFromUrl = urlparams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className='w-full text-gray-200 bg-purple-600 md:w-56'> {/* Change background to purple */}
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor='dark'
              as='div'
              className={`hover:bg-gray-700 ${tab === 'profile' ? 'bg-gray-800' : ''}`}
            >
              Profile
            </Sidebar.Item>
          </Link>

          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=users'>
              <Sidebar.Item
                active={tab === 'users'}
                icon={HiOutlineUserGroup}
                as='div'
                className={`hover:bg-gray-700 ${tab === 'users' ? 'bg-gray-800' : ''}`}
              >
                Users
              </Sidebar.Item>
            </Link>
          )}

         
          <Sidebar.Item
            className='cursor-pointer hover:bg-red-700'
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

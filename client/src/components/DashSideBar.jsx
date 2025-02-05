import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { HiArrowSmRight, HiOutlineUserGroup } from 'react-icons/hi';
import { Sidebar } from 'flowbite-react';

export default function DashSideBar() {
  const location = useLocation();
    const navigate = useNavigate();
  
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
          // Get userId before clearing
          const userId = localStorage.getItem('userId');
  
          const res = await fetch('/api/user/signout', {
              method: 'POST',
          });
          const data = await res.json();
          
          if (!res.ok) {
              console.log(data.message);
          } else {
             
               // Dispatch signout action and navigate
              dispatch(signoutSuccess());
              navigate(`/`);
          }
      } catch (error) {
          console.log(error.message);
      }
  };

  const sidebarStyle = {
    backgroundColor: '#000000',
    color: '#ffffff',
  };

  const itemStyle = {
    backgroundColor: '#000000',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#333333',
    },
  };

  return (
    <div className="w-full h-full md:w-56 drop-shadow-2xl border-b-white">
      <div className="flex flex-col h-full overflow-x-hidden overflow-y-auto text-center">
        <Sidebar className='w-full text-gray-200' style={sidebarStyle}>
          <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
              <Link to='/dashboard?tab=profile'>
                <Sidebar.Item
                  active={tab === 'profile'}
                  label={currentUser ? (currentUser.isAdmin ? 'Admin' : 'User') : 'User'} // Check if currentUser exists
                  labelColor='dark'
                  as='div'
                  className={`hover:bg-gray-700 ${tab === 'profile' ? 'bg-gray-800' : ''}`}
                  style={itemStyle}
                >
                  Profile
                </Sidebar.Item>
              </Link>

              {currentUser?.isAdmin && ( // Ensure currentUser is defined before checking isAdmin
                <Link to='/dashboard?tab=users'>
                  <Sidebar.Item
                    active={tab === 'users'}
                    icon={HiOutlineUserGroup}
                    as='div'
                    className={`hover:bg-gray-700 ${tab === 'users' ? 'bg-gray-800' : ''}`}
                    style={itemStyle}
                  >
                    Users
                  </Sidebar.Item>
                </Link>
              )}

              <Sidebar.Item
                className='cursor-pointer hover:bg-red-700'
                onClick={handleSignout}
                style={{...itemStyle, '&:hover': { backgroundColor: '#8B0000' }}}
              >
                Sign Out
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </div>
  );
}

import { Avatar, Button, Dropdown, DropdownDivider, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from "../assets/cjgym.png"
// import { useSelector } from 'react-redux';


export default function Header() {

    // const { currentUser } = useSelector((state) => state.user);
    const location = useLocation();
    const isHomePage = location.pathname === "/";

  return (
    <header
    className={`border-b-2 border-b-black shadow-md relative ${isHomePage ? "bg-transparent shadow-none border-none" : "bg-gradient-to-r from-[#1f1f1f] to-[#4c0000]"}`}
  >
    <div className="flex items-center justify-between p-6 mx-auto max-w-7xl">
      <Link to="/">
        <img src={logo} alt="logo" className="w-40" />
      </Link>

      <ul className="flex gap-10">
        <Link to="/">
          <li className="hidden sm:inline text-[#D4D4D4] hover:underline hover:underline-offset-4 hover:text-white">
            Home
          </li>
        </Link>
        <Link to="/about">
          <li className="hidden sm:inline text-[#D4D4D4] hover:underline hover:underline-offset-4 hover:text-white">
            About
          </li>
        </Link>
       
          <Link to="/shop">
            <li className="hidden sm:inline text-[#D4D4D4] hover:underline hover:underline-offset-4 hover:text-white">
              Shop
            </li>
          </Link>

</ul>
<div className='flex gap-2 md:order-2'>
                {/* {currentUser ? ( */}
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt='user' rounded />
                        }
                        // label={
                        //     <Avatar alt='user' img={currentUser.profilePicture} rounded />
                        // }
                    >
                        <Dropdown.Header>
                            {/* <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>
                                {currentUser.email}</span> */}
                        </Dropdown.Header>
                        <Link to={'/Dashboard?tab=profile'}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <DropdownDivider />
                        <Dropdown.Item > Signout</Dropdown.Item>

                        {/* <Dropdown.Item onClick={handleSignout}> Signout</Dropdown.Item> */}
                    </Dropdown>
                {/* ) : */}
                    (
                        <Link to='/sign-in'>
                            <button  className='bg-red-900' >
                                Sign In
                            </button>
                        </Link>
                    )
                {/* } */}


            </div>
            </div>
</header>
);
  
}

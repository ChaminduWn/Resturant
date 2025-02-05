import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Dropdown, DropdownDivider, TextInput } from "flowbite-react";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import logo from "../assets/Wn Resturants logo.png";

export default function Header() {
    const path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
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
                // Clear cart data before clearing user data
                if (userId) {
                    localStorage.removeItem(`cart_${userId}`);
                }
                
                // Dispatch signout action and navigate
                dispatch(signoutSuccess());
                navigate(`/`);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    return (
        <header className={`border-b-2 border-b-black shadow-md relative bg-gradient-to-r from-[#AC5180] to-[#160121]`}>
            <div className="flex items-center justify-between p-6 mx-auto max-w-7xl">
                <Link to="/">
                    <img src={logo} alt="logo" className="w-40" />
                </Link>
                

                

                <ul className="flex items-center gap-10"> {/* Aligning items in the center */}
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
                    {!(currentUser?.role === "Manager" || currentUser?.isAdmin) && (
        <Link to="/item">
            <li className="hidden sm:inline text-[#D4D4D4] hover:underline hover:underline-offset-4 hover:text-white">
                Item
            </li>
        </Link>
    )}
                </ul>

                <div className='flex gap-4'> {/* Sign-in dropdown or button */}
                    {currentUser ? (
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar alt='user' img={currentUser.profilePicture} rounded />
                            }
                        >
                            <Dropdown.Header>
                                <span className='block text-sm'>@{currentUser.username}</span>
                                <span className='block text-sm font-medium truncate'>
                                    {currentUser.email}
                                </span>
                            </Dropdown.Header>
                            <Link to={'/Dashboard?tab=profile'}>
                                <Dropdown.Item>Profile</Dropdown.Item>
                            </Link>
                            <DropdownDivider />
                            <Dropdown.Item onClick={handleSignout}> Signout</Dropdown.Item>
                        </Dropdown>
                    ) : (
                        <Link to='/signin'>
                            <button className='px-4 py-2 text-white bg-red-900 rounded'>
                                Sign In
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

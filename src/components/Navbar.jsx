import React, { useCallback, useState, useEffect } from 'react'
import CustomButton from './CustomButton'
import { usePrivy } from '@privy-io/react-auth'
import { menu, search } from '../assets'
import { IconHeartHandshake } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { navLinks } from '../constants'

const Navbar = () => {
    const navigate = useNavigate();
    // The hook that allows us to access the authentication state
    const { ready, authenticated, login, user, logout } = usePrivy()
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const [isActive, setIsActive] = useState('dashboard')
    const [userInfo, setUserInfo] = useState(null);

    // Effect to fetch user info when authenticated
    useEffect(() => {
        if (authenticated && user) {
            console.log('User is authenticated', user);
            // Function to fetch user info from database
            const fetchUserInfo = async () => {
                try {
                    // Replace with actual API call to your database
                    // const response = await fetch(`/api/users/${user.id}`);
                    // const data = await response.json();
                    // setUserInfo(data);
                    console.log('User info fetched successfully');
                } catch (error) {
                    console.error('Error fetching user info:', error);
                }
            };
            
            fetchUserInfo();
        }
    }, [authenticated, user]);

    // Handle login/logout with proper async flow
    const handleLoginLogout = useCallback(async () => {
        if (authenticated) {
            await logout();
            setUserInfo(null);
        } else {
            try {
                await login();
                // Note: Don't try to access user here
                // The useEffect above will handle fetching user info
                // after authentication state updates
            } catch (error) {
                console.error('Login failed:', error);
            }
        }
    }, [authenticated, login, logout]);

    return (
        <div className='mb-[35px] flex flex-col-reverse justify-between gap-6 md:flex-row'>
            {/* Search Bar */}
            <div className='flex h-[52px] max-w-[458px] flex-row
                rounded-[100px] bg-[#1c1c24] py-2 pl-4 pr-2 lg:flex-1'>
                <input 
                    type="text"
                    placeholder='Search for records'
                    className='flex bg-transparent w-full font-epilogue outline-none text-[14px] 
                    text-white font-normal placeholder:text-[#4b5264]'
                />
                <div className='rounded-md flex h-full w-[72px] cursor-pointer items-center justify-center bg-[#4acd8d]'>
                    <img 
                        src={search} 
                        alt="Search icon" 
                        className='h-[15px] w-[15px] object-contain' 
                    />
                </div>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden flex-row items-center justify-end gap-4 sm:flex'>
                {/* Desktop Nav Links */}
                {/* <ul className='flex flex-row items-center gap-6 mr-4'>
                    {navLinks.map((link) => (
                        <li 
                            key={link.name}
                            className={`cursor-pointer flex items-center gap-1 hover:text-[#1dc071] transition-colors
                                ${isActive === link.name ? 'text-[#1dc071]' : 'text-white'}`}
                            onClick={() => {
                                setIsActive(link.name);
                                navigate(link.link);
                            }}
                        >
                            {link.imageUrl && (
                                <img
                                    src={link.imageUrl}
                                    alt={`${link.name} icon`}
                                    className='h-[20px] w-[20px] object-contain'
                                />
                            )}
                            <span className="font-epilogue text-[14px] font-medium">{link.name}</span>
                        </li>
                    ))}
                </ul> */}
                
                {/* Desktop Login/Logout Button */}
                <CustomButton 
                    btnType='button' 
                    title={authenticated ? 'Logout': 'Login'} 
                    styles={`${authenticated ? 'bg-[#1dc071]' : 'bg-[#2c2cf3]'} px-3 py-1 text-sm h-9`}
                    handleClick={handleLoginLogout}
                />
            </div>

            {/* Mobile Menu */}
            <div className='relative flex items-center justify-between gap-2 sm:hidden'>
                <div className='flex h-[40px] cursor-pointer items-center justify-center bg-[#3a3a43] 
                    rounded-[10px] w-[40px]'>
                    <IconHeartHandshake 
                        size={40} 
                        color='#1ec070' 
                        className='p-2'
                    />
                </div>
                
                <img 
                    src={menu} 
                    alt="Toggle navigation menu" 
                    className='h-[34px] w-[34px] cursor-pointer object-contain'
                    onClick={() => setToggleDrawer((prev) => !prev)} 
                />

                {/* Mobile Navigation Drawer */}
                <div 
                    className={`absolute left-0 right-0 top-[60px] z-10 bg-[#1c1c24] py-4 shadow-secondary
                    ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'}
                    transition-all duration-700`}
                >
                    <ul className='mb-4'>
                        {navLinks.map((link) => (
                            <li 
                                key={link.name} 
                                className={`flex items-center gap-3 p-4 cursor-pointer transition-colors
                                    ${isActive === link.name ? 'bg-[#3a3a43]' : ''}`}
                                onClick={() => {
                                    setIsActive(link.name);
                                    setToggleDrawer(false);
                                    navigate(link.link);
                                }}
                            >
                                {link.imageUrl && (
                                    <img
                                        src={link.imageUrl}
                                        alt={`${link.name} icon`}
                                        className='h-[24px] w-[24px] object-contain'
                                    />
                                )}
                                <span className="font-epilogue text-[16px] font-medium text-white">{link.name}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Login/Logout Button - Made Smaller */}
                    <div className="px-4">
                        <CustomButton 
                            btnType='button' 
                            title={authenticated ? 'Logout': 'Login'} 
                            styles={`${authenticated ? 'bg-[#1dc071]' : 'bg-[#2c2cf3]'} w-full py-2 text-sm`}
                            handleClick={handleLoginLogout}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
"use client";
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import '../../globals.css'
import axios from 'axios';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            
            await axios.post('http://127.0.0.1:8000/api/logout', null, {
                headers: {
                    'Authorization': `Bearer ${userData.token}`,
                    'Accept': 'application/json',
                },
                withCredentials: true
            });

            // Clear all auth data
            localStorage.clear();
            setIsLoggedIn(false);
            setUserName('');
            window.location.href = '/main-site';
        } catch (error) {
            console.error('Logout error:', error);
            // Still clear local storage and redirect even if API call fails
            localStorage.clear();
            setIsLoggedIn(false);
            setUserName('');
            window.location.href = '/main-site';
        }
    };

    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem('isLoggedIn');
        const user = JSON.parse(localStorage.getItem('user'));
        
        setIsLoggedIn(isUserLoggedIn === 'true');
        if (user) {
            setUserName(user.name);
        }
    }, []);

    const publicMenu = [
        {
            id: 1,
            name: 'Home',
            path: '/main-site'
        },
        {
            id: 3,
            name: 'Services',
            path: '/main-site/services'
        },
        {
            id: 4,
            name: 'About Us',
            path: '/main-site/about'
        },
        {
            id: 5,
            name: 'Contact Us',
            path: '/main-site/contact'
        }
    ];

    const privateMenu = [
        {
            id: 2,
            name: 'My Bookings',
            path: '/main-site/my-bookings'
        },
        {
            id: 6,
            name: 'Profile',
            path: '/main-site/profile'
        }
    ];

    const currentMenu = isLoggedIn ? [...publicMenu, ...privateMenu] : publicMenu;

    return (
        <div className='flex items-center justify-between p-4 shadow-sm'> 
            <div className='flex items-center gap-10'>
                <Image src='/logo.svg' alt='logo' width={180} height={80} className="cursor-pointer"/>
                <ul className="md:flex gap-8 hidden">
                    {currentMenu.map((item) => (
                        <li key={item.id} className="hover:text-blue-500 duration-200 cursor-pointer hover:scale-105 transition-all ease-in-out">
                            <Link href={item.path}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="relative">
                {isLoggedIn ? (
                    <>
                        <div 
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-semibold hover:bg-blue-600 transition duration-300 cursor-pointer"
                        >
                            {userName.charAt(0).toUpperCase()}
                        </div>
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                <Link href="/main-site/profile">
                                    <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                        My Profile
                                    </div>
                                </Link>
                                <div 
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                                >
                                    Logout
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <Link href="/auth/login">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                            Get Started
                        </button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Header
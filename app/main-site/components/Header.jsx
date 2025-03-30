import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import '../../globals.css'

function Header() {
    const Menu = [
        {
            id: 1,
            name: 'الرئيسية',
            path: '/'
        },
        {
            id: 2,
            name: 'خدماتنا',
            path: '/services'
        },
        {
            id: 3,
            name: 'الأطباء',
            path: '/doctors'
        },
        {
            id: 4,
            name: 'تواصل معنا',
            path: '/contact'
        },
    ]

    return (
        <div className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image 
                                src='/logo.svg' 
                                alt='logo'
                                width={180} 
                                height={80}
                                className="cursor-pointer"
                            />
                        </Link>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="hidden md:flex">
                        <ul className='flex gap-8 items-center'>
                            {Menu.map((item) => (
                                <li key={item.id}>
                                    <Link 
                                        href={item.path}
                                        className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Login/Register Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link 
                            href="../auth/login"
                            className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                            تسجيل الدخول
                        </Link>
                        <Link 
                            href=""
                            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                        >
                            حجز موعد
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button className="text-gray-700 hover:text-blue-600 p-2">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
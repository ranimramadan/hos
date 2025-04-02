import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import '../../globals.css'


function Header() {
    const Menu = [
        {
            id: 1,
            name: 'Home',
            path: '/main-site'
        },
        {
            id: 2,
            name: 'My Bookings',
            path: '/main-site/my-bookings'
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
        },
        {
            id: 6,
            name: 'Profile',
            path: '/main-site/profile'
        }
    ]

    return (
        <div className='flex items-center justify-between p-4 shadow-sm'> 
            <div className='flex items-center gap-10'>

            <Image 
        src='/logo.svg' 
        alt='logo'
        width={180} 
        height={80}
        className="cursor-pointer"
    />
  {/* <ul className="md:flex gap-8 hidden">
    {Menu.map((item) => (
        <Link href={item.path}>
        
        <li className="hover:text-blue-500  duration-200 cursor-pointer hover:scale-105 transition-all ease-in-out" key={item.id}>{item.name}</li> 
        </Link>
    ))}
</ul> */}
<ul className="md:flex gap-8 hidden">
    {Menu.map((item) => (
        <li key={item.id} className="hover:text-blue-500 duration-200 cursor-pointer hover:scale-105 transition-all ease-in-out">
            <Link href={item.path}>
                {item.name}
            </Link>
        </li>
    ))}
</ul>


            </div>
            <Link href="/auth/login">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                Get Started
              </button>
            </Link>
        </div>

 )
}

export default Header
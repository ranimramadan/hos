import React from 'react'
import Image from 'next/image'
import '../../globals.css';

function Header() {
    const Menu=[
        {id:1,
            name:'Home',
            path:'/'
        },
        {id:2,
            name:'Explore',
            path:'/'
        },
        {id:3,
            name:'Contact Us',
            path:'/'
        },
    ]
  return (
    <div>
        <Image src='/logo.svg' alt='logo'
         width={180} height={80}
        />
        <ul className='flex gap-8 justify-start items-center'>
            {Menu.map((item,index)=>(
                <li key={item.id}>
                    {item.name}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Header
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export default function Header() {
  return (
    <div className='shadow-sm border-b sticky top-0 bg-white z-30 p-3'>
      <div className='flex justify-between items-center max-w-6xl mx-auto'>
        {/* Logo */}

        <Link href='/' className='hidden lg:inline-flex text-2xl font-bold'>
          Hextagram
        </Link>

        <Link href='/' className='lg:hidden'>
          <Image src='/hextagram.png' width={50} height={50} alt='small logo'
          />
        </Link>

        {/* search bar */}
        <input type='text' placeholder='Search'
          className='bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[210px]'
        />

        {/* menu items */}
        <button className='text-sm font-semibold text-green-600'>Log In</button>
      </div>
    </div>
  )
}

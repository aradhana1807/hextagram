"use client"
import { signIn, useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export default function Header() {
  const { data: session } = useSession()
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

        {session ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img onClick={signOut} src={session.user.image} alt='profile' className='h-10 w-10 rounded-full cursor-pointer' />
        ) : (
          <button onClick={() => signIn()} className='text-sm font-semibold text-green-600'>Log In
          </button>
        )}


      </div>
    </div >
  )
}

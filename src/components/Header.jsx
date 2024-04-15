"use client"
import { signIn, useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Modal from 'react-modal'
import { IoAddCircleOutline } from "react-icons/io5";
import { FaCameraRetro } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";



export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
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

          <div className='flex gap-5 items-center'>
            <IoAddCircleOutline className='text-4xl cursor-pointer transform hover-125 transition duration-300 hover:text-red-500' onClick={() => setIsOpen(true)} />
            <img onClick={signOut} src={session.user.image} alt='profile' className='h-10 w-10 rounded-full cursor-pointer' />
          </div>

        ) : (
          <button onClick={() => signIn()} className='text-sm font-semibold text-green-600'>Log In
          </button>
        )}


      </div>

      {
        isOpen && (
          <Modal isOpen={isOpen} className='max-w-l w-[90%] p-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 rounded-md shadow-sm'
            onRequestClose={() => setIsOpen(false)}
            ariaHideApp={false}
          >
            <div className='flex flex-col justify-center items-center h-[100%]'>
              <FaCameraRetro className='text-4xl text-gray-700 cursor-pointer' />
              <input type='text' maxLength='150'
                placeholder='Enter a caption...'
                className='m-4 border-none text-center w-full focus:ring-0 outline-none'
              />
              <button className='bg-emerald-600 text-white p-2 w-full shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:brightness-100'>
                Upload
              </button>

              <AiOutlineClose className='text-3xl text-gray-700 cursor-pointer absolute top-2 right-2 hover:text-red-600 transition duration-300' onClick={() => setIsOpen(false)} />
            </div>
          </Modal>
        )
      }
    </div >
  )
}

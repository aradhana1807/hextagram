/* eslint-disable @next/next/no-img-element */
"use client"
import { signIn, useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal'
import { IoAddCircleOutline } from "react-icons/io5";
import { FaCameraRetro } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { app } from '@/firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";


export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [postUploading, setPostUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const db = getFirestore(app);

  function addImageToPost(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  }

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage()
    }
  }, [selectedFile]);

  async function uploadImageToStorage() {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error(error);
        setImageFileUploading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  }

  async function handleSubmit() {
    setPostUploading(true);
    const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      caption,
      profileImg: session.user.image,
      image: imageFileUrl,
      timestamp: serverTimestamp(),

    });
    setPostUploading(false);
    setIsOpen(false);
  }

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

              {selectedFile ? (
                <img
                  onClick={() => setSelectedFile(null)}
                  src={imageFileUrl} alt='selected image' className={`rounded-xl w-full max-h-[250px] object-cover cursor-pointer' ${imageFileUploading ? 'animate-pulse' : ''}`} />
              ) : (
                <FaCameraRetro
                  onClick={() => filePickerRef.current.click()}
                  className='text-4xl text-gray-700 cursor-pointer' />
              )
              }
              <input
                hidden
                ref={filePickerRef}
                type='file'
                accept='image/*'
                onChange={addImageToPost}
              />

            </div>

            <input
              type='text'
              maxLength='150'
              placeholder='Enter a caption...'
              className='m-4 border-none text-center w-full focus:ring-0 outline-none'
              onChange={(e) => setCaption(e.target.value)}
            />
            <button onClick={handleSubmit} disabled={
              !selectedFile || caption.trim() === '' || imageFileUploading || postUploading} className='bg-emerald-600 text-white p-2 w-full shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:brightness-100'>
              Upload Post
            </button>

            <AiOutlineClose className='text-2xl text-gray-700 cursor-pointer absolute top-1 right-1 hover:text-red-600 transition duration-300' onClick={() => setIsOpen(false)}
            />

          </Modal>
        )}
    </div >
  );
}

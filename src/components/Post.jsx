/* eslint-disable @next/next/no-img-element */

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import LikeSection from "./LikeSection";

export default function Post({ post }) {
    return (
        <div className="bg-white my-6 rounded-md border">
            <div className='flex items-center p-4 border-b border-emerald-900'>

                <img src={post.profileImg} alt="profileImg" className='h-12 rounded-full border p-1 mr-3 objext-cover' />

                <p className='font-bold flex-1'>{post.username}
                </p>

                <HiOutlineDotsHorizontal className='h-5 cursor-pointer' />

            </div>

            <img src={post.image} alt="postImg" className='object-cover w-full' />

            <LikeSection id={post.id} />
            <p className="p-5 truncate">
                <span className="font-bold mr-2">{post.username}</span>
                {post.caption}
            </p>
        </div>
    )
}

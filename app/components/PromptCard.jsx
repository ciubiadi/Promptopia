'use client';

import React, { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState('');
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    // reset the setCopied in 3 seconds
    setTimeout(() => setCopied(''), 3000);
  }
  
  return (
    <div className='prompt_card'>
        <div className="flex justify-between items-start gap-5">
            {/* CREATOR INFO DETAILS */}
            <div 
                className='flex-1 flec justify-start items-center gap-3 cursor-pointer'
            >
                <Image 
                    src={post.creator.image}
                    alt="user_image"
                    width={40}
                    height={40}
                    className='rounded-full object-contain'
                />

                <div className='flex flex-col'>
                    <h3 className='font-satoshi font-semibold text-gray-900'>
                        {post.creator.username}
                    </h3>
                    <o className="font-inter text-sm text-gray-500">
                        {post.creator.email}
                    </o>
                </div>
            </div>

            <div className='copy_btn' onClick={() => {handleCopy}}>
                <Image 
                    src={
                        copied === post.prompt
                        ? "/assets/icons/tick.svg"
                        : "/assets/icons/copy.svg"
                    }
                    alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
                    width={12}
                    height={12}
                />
            </div>
        </div>

        <p className='my-4 font-satoshi text-sm text-gray-700'>
            {post.prompt}</p>
        <p className='font-inter text-sm blue_gradient cursor-pointer'
            onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
            {post.tag}
        </p>

        {/* check if the current logged in user is the creator of that post
         and if the user is on the profile page */}
        {session?.user.id === post.creator._id && pathName === '/profile' && (
            <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
                <p 
                    className='font-inter text-sm green_gradient cursor-pointer'
                    onClick={handleEdit}
                >
                    Edit
                </p>
                <p
                    className='font-inter text-sm orange_gradient cursor-pointer'
                    onClick={handleDelete}
                >
                    Delete
                </p>
            </div>
        )}
    </div>
  )
}

export default PromptCard
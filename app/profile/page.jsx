'use client';

import React, { useState, useEffect} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '../components/profile';

const MyProfile = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();

            setPosts(data);
        }

        if(session?.user.id)
            fetchPosts();
    }, []);

    const handleEdit = () => {

    }

    const handleDelete = () => {

    }

    return (
        <Profile 
            name="My"
            description="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile
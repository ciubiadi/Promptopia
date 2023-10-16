import React from 'react'
import PromptCard from './PromptCard'

const Profile = ({ name, description, data, handleEdit, handleDelete }) => {
    if(description == undefined)
        description = `Welcome to ${name}'s profile page.
         Check his/hers exceptional prompts and get inspired!`;
    
        return (
    <section className='w-full'>
        <h1 className='head_text text-left'>
            <span className='blue_gradient'>{name} Profile</span>
        </h1>
        <p className='desc text-left'>{description}</p>
        <div className='mt-10 prompt_layout'>
            {data.map((post) => (
                <PromptCard 
                    key={post._id}
                    post={post}
                    handleEdit={() => handleEdit && handleEdit(post)}
                    handleDelete={() => handleDelete && handleDelete(post)}
                />
            ))}
        </div>
    </section>
  )
}

export default Profile
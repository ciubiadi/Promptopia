"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getProviders, signIn, signOut } from 'next-auth/react';

const Nav = () => {
    const isUserLoggedIn = true;
    
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    // allow auth using google and next auth
    useEffect(() => {
        const setTheProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }

        setProviders();
    });
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href="/" className='flex gap-2 flex-center'>
            <Image 
                width="30"
                height="30"
                alt="Promptopia Logo"
                className='object-contain'
                src="/assets/images/logo.svg"
            />
            <p className='logo_text'>Promptopia</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
            {isUserLoggedIn ? (
                <div className='flex gap-3 md:gap-5'>
                    <Link href="/create-prompt" className='black_btn'>
                        Create Post
                    </Link>

                    <button type="button" className='outline_btn' onClick={signOut}>
                        Sign Out
                    </button>

                    <Link href="/proifle">
                        <Image 
                            width={40}
                            height={40}
                            className='rounded-full'
                            alt="profile"
                            src="/assets/images/logo.svg"
                        />
                    </Link>
                </div>
            ) : (
                <>
                    {providers && Object.values(providers).map((provider) => (
                        <button 
                            type="button" 
                            key={provider.name}
                            className="black_btn"
                            onClick={() => {
                                // sign in
                            }}
                        >
                            Sign In
                        </button>
                    ))}
                </>
            )}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
            {isUserLoggedIn ? (
                <div className="flex">
                    <Image 
                        width={30}
                        height={30}
                        className='rounded-full'
                        alt="profile"
                        src="/assets/images/logo.svg"
                        onClick={() => setToggleDropdown((prev) => !prev)}
                    />

                    {toggleDropdown && (
                        <div className='dropdown'>
                            <Link 
                                href="/profile"
                                className='dropdown_link'
                                onClick={() => setToggleDropdown(false)}
                            >
                                My Profile
                            </Link>
                            <Link 
                                href="/create-prompt"
                                className='dropdown_link'
                                onClick={() => setToggleDropdown(false)}
                            >
                                Create Prompt
                            </Link>
                            <button type="button" onClick={() => {
                                setToggleDropdown(false);
                                signOut();
                            }}
                                className="mt-5 w-full black_btn"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    {providers && Object.values(providers).map((provider) => (
                        <button 
                            type="button" 
                            key={provider.name}
                            className="black_btn"
                        >
                            Sign In
                        </button>
                    ))}
                </>
            )}
        </div>
    </nav>
  )
}

export default Nav
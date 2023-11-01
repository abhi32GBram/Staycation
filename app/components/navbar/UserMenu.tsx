// Import necessary modules and components.
'use client';
import React from 'react';
import { useState, useCallback } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar'; // Custom component for displaying the user's avatar.
import MenuItem from './MenuItem'; // Custom component for menu items.

// Import custom hooks for the register and login modals.
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';

import {useRouter} from 'next/navigation'

import LoginModal from '../modals/LoginModal';
import useRentModal from '@/app/hooks/useRentModal';

// Define the props interface for the 'UserMenu' component.
interface UserMenuProps {
    currentUser?: SafeUser | null; // Optional current user data.
}

// Define a functional component named 'UserMenu'.
const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    // Initialize the register and login and Rent modal hooks.
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const router = useRouter()

    // Initialize a state variable 'isOpen' and a function 'setisOpen' using the 'useState' hook.
    const [isOpen, setisOpen] = useState(false);

    // Create a callback function 'toggleOpen' to toggle the 'isOpen' state.
    const toggleOpen = useCallback(() => {
        setisOpen((value) => !value);
    }, []);

    // Callback function for handling the 'Rent' action
    const onRent = useCallback(() => {
        if (!currentUser) {
            // If no user is logged in, open the login modal.
            return loginModal.onOpen();
        } else {
            // If a user is logged in, open the rent modal.
            rentModal.onOpen();
        }
    }, [currentUser, loginModal, rentModal]);

    return (
        <div className='relative'>
            <div className='flex flex-row items-center gap-3'>
                {/* Create a clickable div for "Staycation your Home" (hidden on medium-sized screens). */}
                <div onClick={onRent} className='hidden md:block text-sm font-semibold px-4 py-3 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
                    Staycation your Home
                </div>

                {/* Create a button with an avatar and a menu icon, clickable to toggle the dropdown. */}
                <div onClick={toggleOpen} className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'>
                    <AiOutlineMenu /> {/* Display the menu icon. */}
                    <div className='hidden md:block'>
                        <Avatar src={currentUser?.image} /> {/* Display the user's avatar (hidden on medium-sized screens). */}
                    </div>
                </div>
            </div>

            {/* Conditionally render the dropdown menu when 'isOpen' is true. */}
            {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                    <div className='flex flex-col cursor-pointer'>
                        {currentUser ? (
                            <>
                                {/* If a user is logged in, show user-specific menu options. */}
                                <MenuItem onClick={() => router.push('/trips')} label='My Trips' /> {/* Show user's trips. */}
                                <MenuItem onClick={() => { }} label='My Favourites' /> {/* Show user's favorites. */}
                                <MenuItem onClick={() => { }} label='My Reservations' /> {/* Show user's reservations. */}
                                <MenuItem onClick={rentModal.onOpen} label='Staycation My Home' /> {/* Show user's home details. */}
                                <hr />
                                <MenuItem onClick={() => signOut()} label='Log Out' /> {/* Log out the user. */}
                            </>
                        ) : (
                            <>
                                {/* If no user is logged in, show login and signup options. */}
                                <MenuItem onClick={loginModal.onOpen} label='Login' /> {/* Trigger the login modal opening. */}
                                <MenuItem onClick={registerModal.onOpen} label='Sign Up' /> {/* Trigger the register modal opening. */}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// Export the 'UserMenu' component as the default export of this module.
export default UserMenu;

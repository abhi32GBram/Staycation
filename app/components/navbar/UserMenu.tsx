'use client'
import React from 'react'
import { useState, useCallback } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'

const UserMenu = () => {
    const [isOpen, setisOpen] = useState(false)
    const toggleOpen = useCallback(
        () => {
            setisOpen((value) => !value)
        },[])

    return (
        <div className='relative'>
            <div className='flex flex-row items-center gap-3'>
                <div onClick={() => { }} className='hidden md:block text-sm font-semibold px-4 py-3 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
                    Staycation your Home
                </div>
                <div onClick={ toggleOpen} className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer  hover:shadow-md transition'>
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar />
                    </div>
                </div>
            </div>
            {isOpen && ( 
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white  overflow-hidden right-0 top-12 text-sm'>
                    <div className='flex flex-col pointer-pointer'>
                        <>
                            <MenuItem onClick={()=>{}} label='Login' />
                            <MenuItem onClick={()=>{}} label='SignUp' />
                        </>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu
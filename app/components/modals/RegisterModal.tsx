// Import necessary modules and components.
'use client';
import React from 'react';
import axios from 'axios';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import { useCallback, useState } from 'react';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';

import Modal from './Modals';
import Heading from '../Heading';
import Input from '../inputs/Input';

import toast from 'react-hot-toast';
import Button from '../Button';

// Define a functional component named RegisterModal.
const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setisLoading] = useState(false);

    // Initialize the form using 'react-hook-form'.
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    // Define a function to handle form submission.
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setisLoading(true);

        // Send a POST request to the '/api/register' endpoint with user data.
        axios.post('/api/register', data)
            .then(() => {
                // Close the registration modal upon success.
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error('Something went wrong');
            })
            .finally(() => {
                setisLoading(false); // Reset the loading state.
            });
    }

    // Define the content of the modal's body.
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            {/* This is the body of the modal */}
            <Heading title='Welcome to Staycation' subtitle='Create an Account' />
            <Input id='email' label='E-Mail' disabled={isLoading} register={register} errors={errors} required />
            <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' label='Password' type='password' disabled={isLoading} register={register} errors={errors} required />
        </div>
    );

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={()=>{}} />
            <Button outline label='Continue with GitHub' icon={AiFillGithub} onClick={()=>{}} />
            <div className='text-neutral-500 text-center mt-4 text-light'>
                <div>
                    <div className=' justify-center flex flex-row items-center gap-2'>
                        Already have an Account ?
                    </div>
                    <div className='text-neutral-800 cursor-pointer hover:underline' onClick={registerModal.onClose}>
                        Log In 
                    </div>
                </div>
            </div>
        </div>
    )
    
    return (
        // Render the modal, passing necessary props and handlers.
        <Modal disabled={isLoading} isOpen={registerModal.isOpen} title='Register' actionLabel='Continue' onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />
    );
}

// Export the RegisterModal component as the default export of this module.
export default RegisterModal;

//1 35 
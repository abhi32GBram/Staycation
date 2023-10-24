// Import necessary modules and components.
'use client';
import React from 'react';
import axios from 'axios';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import { useCallback, useState } from 'react';

// Import the router from Next.js for navigation.
import { useRouter } from 'next/navigation';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

// Import the 'signIn' function from NextAuth to handle user authentication.
import { signIn } from 'next-auth/react';

import Modal from './Modals'; // A custom Modal component.
import Heading from '../Heading'; // A custom Heading component.
import Input from '../inputs/Input'; // A custom Input component for form inputs.
import toast from 'react-hot-toast'; // A notification library.
import Button from '../Button'; // A custom Button component.

// Define a functional component named LoginModal.
const LoginModal = () => {
    // Get the router for navigation within the app.
    const router = useRouter();
    // Get instances of the login and register modals.
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    // Initialize the loading state.
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
            email: '',
            password: ''
        }
    });

    // Define a function to handle form submission.
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        // Set loading state to true while processing the form.
        setisLoading(true);

        // Sign in the user using NextAuth's 'signIn' function with 'credentials' provider.
        signIn('credentials', {
            ...data, // Include user credentials.
            redirect: false // Prevent automatic redirection for custom handling.
        }).then((callback) => {
            // Reset loading state.
            setisLoading(false);

            // Check if the sign-in was successful.
            if (callback?.ok) {
                // Show a success toast message and refresh the page.
                toast.success("Logged In !");
                router.refresh();
                loginModal.onClose(); // Close the login modal.
            }

            // Check if there was an error during sign-in.
            if (callback?.error) {
                // Show an error toast with the error message.
                toast.error(callback.error);
            }
        });
    }

    // Define the content of the modal's body.
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            {/* This is the body of the modal */}
            <Heading title='Welcome Back to Staycation' subtitle='Login to your Account ! ' />
            <Input id='email' label='E-Mail' disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' label='Password' type='password' disabled={isLoading} register={register} errors={errors} required />
        </div>
    );

    // Define the content of the modal's footer.
    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => signIn('google')} />
            <Button outline label='Continue with GitHub' icon={AiFillGithub} onClick={() => signIn('github')} />
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
        <Modal disabled={isLoading} isOpen={loginModal.isOpen} title='Login' actionLabel='Continue' onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />
    );
}

// Export the LoginModal component as the default export of this module.
export default LoginModal;

// Import necessary modules and components.
'use client'
import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import Modal from './Modals'
import useRentModal from '@/app/hooks/useRentModal'

import Heading from '../Heading'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import dynamic from 'next/dynamic'

import Counter from '../inputs/Counter'
import ImageUpload from '../inputs/ImageUpload'
import { categories } from '../navbar/Categories'
import CountrySelect from '../inputs/CountrySelect'
import CategoryInput from '../inputs/CategoryInput'
import Input from '../inputs/Input'
import { IoPlaySkipForwardOutline } from 'react-icons/io5'
import axios from 'axios'
import toast from 'react-hot-toast'

// Define an enumeration for the different steps in the rental process.
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {

    const router = useRouter()

    // Use the 'useRentModal' custom hook to manage the rental modal state.
    const rentModal = useRentModal()

    // Initialize the 'step' state to manage the current step in the rental process.
    const [step, setstep] = useState(STEPS.CATEGORY)

    const [isLoading, setisLoading] = useState(false)

    // Use the 'useForm' hook from 'react-hook-form' to manage form data and validation.
    const {
        register,           // Register form inputs for validation and data binding.
        handleSubmit,        // Handle form submission.
        setValue,            // Set form field values programmatically.
        watch,               // Watch for changes in form fields.
        formState: { errors }, // Access form validation errors.
        reset               // Reset form data.
    } = useForm<FieldValues>({
        defaultValues: {
            categories: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    })

    // Watch for changes in the 'category' and 'location' fields.
    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('image')

    // Dynamically import the 'Map' component based on whether the 'location' is set.
    const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [location]);

    // Function to set a custom form field value with validation flags.
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,   // Indicates that the value of the field has been changed or modified.
            shouldTouch: true,   // Indicates that the field has been interacted with (e.g., clicked, focused, or edited) by the user.
            shouldValidate: true // Ensures that the field's validation rules are applied again to the new value, often necessary when the value of a form field changes.
        })
    }

    // Function to navigate to the previous step.
    const onBack = () => {
        setstep((value) => value - 1)
    }

    // Function to navigate to the next step.
    const onNext = () => {
        setstep((value) => value + 1)
    }

    // Define an event handler for form submission, which takes the form data as 'data'.
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        // Check if the current step is not 'PRICE'.
        if (step !== STEPS.PRICE) {
            // If not in the 'PRICE' step, move to the next step and return.
            return onNext();
        }

        // Set the loading state to indicate that the form submission is in progress.
        setisLoading(true);

        // Make an HTTP POST request to the '/api/listings' endpoint with the form data.
        axios.post('/api/listings', data).then(() => {
            // If the request is successful, display a success notification.
            toast.success("Listing Created Successfully !");

            // Refresh the router, likely to update the UI with the new listing.
            router.refresh();

            // Reset the form data for a new listing and close the modal.
            reset();
            rentModal.onClose();
        }).catch(() => {
            // If the request encounters an error, display an error notification.
            toast.error("Something Went Wrong ! ");
        }).finally(() => {
            // Set the loading state to false to indicate that the submission process is complete.
            setisLoading(false);
        });
    }
    // Determine the label for the primary action button based on the current step.
    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create'
        }
        return 'Next'
    }, [step])

    // Determine the label for the secondary action button based on the current step.
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }
        return 'Back'
    }, [step])

    // Define the content for the modal's body based on the current step.
    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading title='Which of these Best describe your Place ?' subtitle='Pick a Category' />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
                {categories.map((item) => (
                    <div key={item.label} className='col-span-1'>
                        <CategoryInput
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                            onClick={(category) => setCustomValue('category', category)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    // Update body content if the current step is 'LOCATION'.
    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title='Where is your Place Located ?' subtitle='Help Guests find you !' />
                <CountrySelect value={location} onChange={(value) => setCustomValue('location', value)} />
                <Map center={location?.latlng} />
            </div>
        )
    }

    // Update body content if the current step is 'INFO'.
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your place"
                    subtitle="What Amenities do you have?"
                />
                <Counter
                    onChange={(value) => setCustomValue('guestCount', value)}
                    value={guestCount}
                    title="Guests"
                    subtitle="How many guests do you allow?"
                />
                <hr />
                <Counter
                    onChange={(value) => setCustomValue('roomCount', value)}
                    value={roomCount}
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                />
                <hr />
                <Counter
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                    value={bathroomCount}
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                />
            </div>
        )
    }

    // Update body content if the current step is 'IMAGES'.
    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <div>
                    <Heading title='Add a Photo of your Place' subtitle='Show your Guests a Glimpse of your Property !' />
                    <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
                </div>
            </div>
        )
    }

    // Check if the current step is 'DESCRIPTION'.
    if (step === STEPS.DESCRIPTION) {
        // Define the content for the 'DESCRIPTION' step.
        bodyContent = (
            <div className='flex flex-col gap-8'>
                {/* Display a heading for the 'DESCRIPTION' step. */}
                <Heading title='How would you describe your Place' subtitle='In Short and Sweet does it' />

                {/* Input field for 'Title' with error handling and validation. */}
                <Input id='title' label='Title' disabled={isLoading} register={register} errors={errors} required />

                {/* Horizontal line to separate input fields. */}
                <hr />

                {/* Input field for 'Description' with error handling and validation. */}
                <Input id='description' label='Description' disabled={isLoading} register={register} errors={errors} required />
            </div>
        )
    }

    // Check if the current step is 'PRICE'.
    if (step === STEPS.PRICE) {
        // Define the content for the 'PRICE' step.
        bodyContent = (
            <div className='flex flex-col gap-8'>
                {/* Display a heading for the 'PRICE' step. */}
                <Heading title='Now, Set a Price !' subtitle='How much will you Charger per Night ?' />

                {/* Input field for 'Price' with special formatting for currency and number type. */}
                <Input id='price' label='Price' formatPrice={true} type='number' disabled={isLoading} register={register} errors={errors} required />
            </div>
        )
    }

    // Return the Modal component with the appropriate body content based on the current step.
    return (
        <Modal
            title='Staycation your Home '
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}  // Set the label for the primary action button.
            secondaryActionLabel={secondaryActionLabel} // Set the label for the secondary action button.
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        />
    )

}
export default RentModal


// 432 
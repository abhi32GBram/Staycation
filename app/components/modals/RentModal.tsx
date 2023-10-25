// Import necessary modules and components.
'use client'
import React, { useMemo, useState } from 'react'

import Modal from './Modals'
import useRentModal from '@/app/hooks/useRentModal'

import Heading from '../Heading'
import { categories } from '../navbar/Categories'
import CategoryInput from '../inputs/CategoryInput'

import { FieldValues, useForm } from 'react-hook-form'

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
    // Use the 'useRentModal' custom hook to manage the rental modal state.
    const rentModal = useRentModal()

    // Initialize the 'step' state to manage the current step in the rental process.
    const [step, setstep] = useState(STEPS.CATEGORY)

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

    // Watch for changes in the 'category' field.
    const category = watch('category')

    // Function to set a custom form field value.
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,   //  value of the field has been changed or modified
            shouldTouch: true,   //   the field has been interacted with (e.g., clicked, focused, or edited) by the user
            shouldValidate: true //   often necessary when the value of a form field changes, and this property ensures that the field's validation rules are applied again to the new value.
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

    return (
        <Modal
            title='Staycation your Home '
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={rentModal.onClose}
            actionLabel='Submit'
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        />
    )
}

export default RentModal

// Import necessary modules and components.
'use client'
import React from 'react'

import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useCallback } from 'react'

import { TbPhotoPlus } from 'react-icons/tb'

// Declare global variable 'cloudinary' for type checking.
declare global {
    var cloudinary: any
}

// Define the props for the ImageUpload component.
interface ImageUploadProps {
    onChange: (value: string) => void // Callback function to handle image upload changes.
    value: string // The current image value.
}

// ImageUpload component to handle image uploads.
const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange, value
}) => {
    // Callback function to handle image upload result.
    const handleUpload = useCallback(
        (result: any) => {
            onChange(result.info.secure_url) // Pass the secure URL of the uploaded image to the onChange callback.
        },
        [onChange]
    )

    return (
        <CldUploadWidget onUpload={handleUpload} uploadPreset='wbvsb2lq' options={{
            maxFiles: 1
        }}>
            {({ open }) => {
                return (
                    <div onClick={() => open?.()} className='
                        relative 
                        cursor-pointer
                        hover:opacity-70
                        transition
                        border-dashed
                        border-2
                        p-20
                        border-neutral-200
                        flex 
                        flex-col
                        justify-center
                        items-center
                        gap-4
                        text-neutral-600'>
                        <TbPhotoPlus size={45} /> {/* Render a photo icon for image upload. */}
                        <div className='font-semibold text-lg'>
                            Click to Upload  {/* Display a message to instruct users to click for upload. */}
                        </div>
                        {
                            value && (
                                <div className='absolute inset-0 w-full h-full'>
                                    <Image alt='Upload' fill style={{ objectFit: 'cover' }} src={value} />
                                </div>
                            )
                        }
                    </div>
                )
            }}
        </CldUploadWidget>
    )
}

export default ImageUpload

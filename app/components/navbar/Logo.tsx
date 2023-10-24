'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"

// Define a functional component named Logo.
const Logo = () => {
    // Initialize the useRouter hook to access the routing information.
    const router = useRouter()

    // Render the Logo component.
    return (
        // Use the Image component to display an image. This image is wrapped in a link (cursor-pointer) and hidden on medium-sized screens (md:block).
        <Image onClick={()=>router.push('/')} alt="logo" className="hidden md:block cursor-pointer" height='100' width='100' src='/images/logo.png'/>
    )
}

// Export the Logo component as the default export of this module.
export default Logo

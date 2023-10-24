'use client'


import { SafeUser } from "@/app/types";

import Container from "../container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

// Define an interface for the NavbarProps.
interface NavbarProps {
    currentUser? : SafeUser | null
}

// Define a functional component named Navbar, which expects props of type NavbarProps.
const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {
    return (
        // Render a fixed navigation bar with a white background, a shadow, and a z-index of 10.
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                {/* Use the Container component to provide a container for the content. */}
                <Container>
                    {/* Create a flex container with items centered and justified between. */}
                    <div className=" flex flex-row items-center justify-between gap-3 md:gap-0">
                        {/* Include the Logo component for displaying the site's logo. */}
                        <Logo />
                        
                        {/* Include the Search component for search functionality. */}
                        <Search />
                        
                        {/* Include the UserMenu component for user-related menu options. */}
                        <UserMenu currentUser={currentUser}/>
                    </div>
                </Container>
            </div>
        </div>
    );
};

// Export the Navbar component as the default export of this module.
export default Navbar;

// Import the 'Fascinate' font from 'next/font/google'.
import { Fascinate } from 'next/font/google';
// Import necessary modules and components.
import React from 'react';
import { create } from "zustand";

// Define the props interface for the 'RegisterModal' component.
interface RegisterModalProps {
    isOpen: boolean; // Flag indicating whether the modal is open.
    onOpen: () => void; // Function to handle modal opening.
    onClose: () => void; // Function to handle modal closing.
}

// Create a custom hook 'useRegisterModal' using 'zustand'.
const useRegisterModal = create<RegisterModalProps>((set) => ({
    isOpen: false, // Initial state: modal is closed.
    onOpen: () => set({ isOpen: true }), // Function to open the modal.
    onClose: () => set({ isOpen: false }), // Function to close the modal.
}));

// Export the 'useRegisterModal' hook for use in other components.
export default useRegisterModal;

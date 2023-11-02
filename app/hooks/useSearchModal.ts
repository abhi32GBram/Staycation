import { create } from 'zustand';

// Define the shape of the SearchModalStore.
interface SearchModalStore {
    isOpen: boolean;   // Flag to track if the search modal is open.
    onOpen: () => void;  // Function to open the search modal.
    onClose: () => void; // Function to close the search modal.
}

// Create a Zustand store for the search modal with initial state and actions.
const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,  // Initial state: modal is closed.
    onOpen: () => set({ isOpen: true }),  // Action to open the modal.
    onClose: () => set({ isOpen: false })  // Action to close the modal.
}));

export default useSearchModal;  // Export the created Zustand store for use in components.

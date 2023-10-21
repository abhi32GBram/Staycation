'use client';

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import Button from "../Button";

// Define the props interface for the 'Modal' component.
interface ModalProps {
    isOpen?: boolean; // An optional flag to control the modal's visibility.
    onClose: () => void; // A function to handle modal closing.
    onSubmit: () => void; // A function to handle modal submission.
    title?: string; // An optional title for the modal.
    body?: React.ReactElement; // An optional content for the modal body.
    footer?: React.ReactElement; // An optional content for the modal footer.
    actionLabel: string; // The label for the main action button.
    disabled?: boolean; // An optional flag to disable user interactions.
    secondaryAction?: () => void; // An optional function for a secondary action.
    secondaryActionLabel?: string; // An optional label for the secondary action button.
}

// Define the 'Modal' component.
const Modal: React.FC<ModalProps> = ({
    isOpen, onClose, onSubmit, title, body, actionLabel, footer, disabled, secondaryAction, secondaryActionLabel
}) => {
    // State to control the modal's visibility.
    const [showModal, setShowModal] = useState(isOpen);

    // Use 'useEffect' to update 'showModal' based on the 'isOpen' prop.
    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    // Function to handle closing the modal.
    const handleClose = useCallback(() => {
        // If the main action is disabled, do nothing.
        if (disabled) {
            return;
        }

        // Hide the modal and then trigger the 'onClose' function after a delay.
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose, disabled]);

    // Function to handle the main action button click.
    const handleSubmit = useCallback(() => {
        // If the main action is disabled, do nothing.
        if (disabled) {
            return;
        }

        // Trigger the 'onSubmit' function.
        onSubmit();
    }, [onSubmit, disabled]);

    // Function to handle the secondary action button click.
    const handleSecondaryAction = useCallback(() => {
        // If the secondary action is disabled or not defined, do nothing.
        if (disabled || !secondaryAction) {
            return;
        }

        // Trigger the secondary action function.
        secondaryAction();
    }, [secondaryAction, disabled]);

    // If the modal is not open, return null to prevent rendering.
    if (!isOpen) {
        return null;
    }

    // Render the modal component.
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
                <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
                    <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                                <button className="p-1 border-0 hover:opacity-70 transition absolute left-9" onClick={handleClose}>
                                    <IoMdClose size={18} />
                                </button>
                                <div className="text-lg font-semibold">
                                    {title}
                                </div>
                            </div>
                            <div className="relative p-6 flex-auto">
                                {body}
                            </div>
                            <div className="flex flex-col gap-2 p-6">
                                <div className="flex flex-row items-center gap-4 w-full">
                                    {secondaryAction && secondaryActionLabel && (
                                        // Render a secondary action button if defined.
                                        <Button
                                            disabled={disabled}
                                            label={secondaryActionLabel}
                                            onClick={handleSecondaryAction}
                                            outline
                                        />
                                    )}
                                    {/* Render the main action button. */}
                                    <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                    />
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;

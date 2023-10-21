// Import the 'Toaster' component from the 'react-hot-toast' library.
import { Toaster } from 'react-hot-toast';

// Define the 'ToasterProvider' component, which provides a toast notification system.
const ToasterProvider = () => {
    return (
        <Toaster />
        /* Render the 'Toaster' component to enable toast notifications. */
    );
}

// Export the 'ToasterProvider' component as the default export of this module.
export default ToasterProvider;

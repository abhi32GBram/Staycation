import { HashLoader, RiseLoader } from "react-spinners"; // Import the PuffLoader component from react-spinners.

// Define the Loader component for displaying a loading animation.
const Loader = () => {
    return (
        <div className="h-[70vh] flex  flex-col justify-center items-center ">
            <RiseLoader
                size={100}
                color="purple"
            />
        </div>
    );
}

export default Loader; // Export the Loader component.

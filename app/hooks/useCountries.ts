// Import the 'world-countries' package to access country data.
import countries from "world-countries";

// Format the country data into a more usable format.
const formattedCountries = countries.map((country) => ({
    value: country.cca2, // Store the two-letter country code.
    label: country.name.common, // Store the common name of the country.
    flag: country.flag, // Store the URL of the country's flag.
    latlng: country.latlng, // Store the latitude and longitude coordinates of the country.
    region: country.region // Store the region to which the country belongs.
}))

// Define a custom hook called 'useCountries' for working with the formatted country data.
const useCountries = () => {
    // Function to get all the formatted country data.
    const getAll = () => formattedCountries

    // Function to get a country's data by its two-letter code (cca2).
    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value)
    }

    // Return an object containing the defined functions to the caller.
    return {
        getAll, // A function to get all countries' data.
        getByValue // A function to get a country's data by its two-letter code.
    }
}

// Export the 'useCountries' custom hook as the default export of this module.
export default useCountries

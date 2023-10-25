// Import necessary modules and components.
'use client'
import React from 'react'

// Import the 'useCountries' custom hook to access country data.
import useCountries from '@/app/hooks/useCountries'

// Import the 'Select' component from 'react-select' for country selection.
import Select from 'react-select'

// Define the type for the selected value in the country select.
export type CountrySelectValue = {
    flag: string,    // The flag URL of the selected country.
    label: string,   // The label or common name of the selected country.
    latlng: number[], // The latitude and longitude coordinates of the selected country.
    region: string,  // The region to which the selected country belongs.
    value: string    // The two-letter code (cca2) of the selected country.
}

// Define the props interface for the 'CountrySelect' component.
interface CountrySelectProps {
    value?: CountrySelectValue // The currently selected country value (optional).
    onChange: (value: CountrySelectValue) => void // Function to handle changes in selected country.
}

// Define the 'CountrySelect' functional component.
const CountrySelect: React.FC<CountrySelectProps> = ({
    value,    // Destructure the 'value' prop.
    onChange   // Destructure the 'onChange' prop.
}) => {
    // Access the 'getAll' function from the 'useCountries' custom hook.
    const { getAll } = useCountries()

    return (
        <div>
            {/* Render the 'Select' component for country selection. */}
            <Select
                placeholder='Anywhere...' // Placeholder text for the select input.
                isClearable // Allow clearing the selected country.
                options={getAll()} // Provide the list of country options.
                value={value} // Set the selected value based on the 'value' prop.
                onChange={(value) => onChange(value as CountrySelectValue)} // Handle changes in the selected value.
                formatOptionLabel={(option) => (
                    <div className='flex flex-row items-center gap-3'>
                        <div>
                            {option.flag} {/* Display the country's flag. */}
                        </div>
                        <div>
                            {option.label}, {/* Display the country's common name. */}
                        </div>
                        <span className='text-neutral-500 ml-1'>
                            {option.region} {/* Display the region to which the country belongs. */}
                        </span>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2', // CSS class for the control element.
                    input: () => 'text-lg', // CSS class for the input element.
                    option: () => 'text-lg' // CSS class for individual option elements.
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black', // Color for selected elements.
                        primary25: "#ae8aeb" // Color for selected elements when hovered.
                    }
                })}
            />
        </div>
    )
}

// Export the 'CountrySelect' component as the default export of this module.
export default CountrySelect

// Import necessary modules and components.
'use client'
import React from 'react'

// Import the Leaflet library (L) for mapping functionality.
import L from 'leaflet'

// Import components and functions from 'react-leaflet' for creating the map.
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

// Import the CSS styles for Leaflet to ensure proper rendering.
import 'leaflet/dist/leaflet.css'

// Import marker icons and shadow images from the Leaflet library.
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Suppress TypeScript errors regarding 'delete L.Icon.Default.prototype._getIconUrl'.
// This is used to fix an issue with loading marker icons.
//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl

// Merge custom options for the default icon with the imported marker icon URLs.
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src, // URL for the default icon.
    iconRetinaUrl: markerIcon2x.src, // URL for the default icon in higher resolution.
    shadowUrl: markerShadow.src // URL for the shadow of the default icon.
})

// Define the props interface for the 'Map' component.
interface MapProps {
    center?: number[] // Optional prop for specifying the map center coordinates.
}

// Define the 'Map' functional component.
const Map: React.FC<MapProps> = ({
    center // Destructure the 'center' prop for map center coordinates.
}) => {
    return (
        // Create a map container using 'MapContainer' with specified attributes.
        <MapContainer
            center={center as L.LatLngExpression || [51, -0.09]} // Specify the map center coordinates.
            zoom={center ? 4 : 2} // Set the initial zoom level based on the presence of 'center'.
            scrollWheelZoom={true} // Enable scroll wheel zoom.
            className='h-[35vh] rounded-lg' // Apply CSS styles to the map container.
        >
            {/* Add a tile layer with the URL for the map tiles (OpenStreetMap). */}
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Render a marker if 'center' coordinates are provided. */}
            {center && (
                <Marker position={center as L.LatLngExpression} />
            )}
        </MapContainer>
    )
}

// Export the 'Map' component as the default export of this module.
export default Map

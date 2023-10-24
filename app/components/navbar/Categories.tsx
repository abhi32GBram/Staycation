// Import necessary dependencies and components
'use client'
import React from 'react'
import Container from '../container'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

// Import icons from various libraries (react-icons)
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import CategoryBox from '../CategoryBox'
import { FaSkiing } from 'react-icons/fa'
import { BsSnow } from 'react-icons/bs'
import { IoDiamond } from 'react-icons/io5'

// Define an array of categories with their labels, icons, and descriptions
export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This Property is Close to a Beach'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This Property has Windmills'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This Property has Modern Architecture'
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This Property is in the Countryside'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This Property has a Pool'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This Property is on an Island'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This Property is close to a Lake'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This Property has a Ski Resort'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This Property is close to Castles'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This Property has Camping Activities'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This Property has Modern Architecture'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'This Property is close to Caves'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This Property is in the Desert'
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This Property has a Barn'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This Property is the Luxurious Suite'
    },
]

// Define the Categories component
const Categories = () => {
    // Use custom hooks to access router information
    const params = useSearchParams()
    const category = params?.get('category')
    const pathname = usePathname()

    // Check if the current page is the main page
    const isMainPage = pathname === '/'
    if (!isMainPage) {
        // If it's not the main page, return nothing (null)
        return null
    }

    return (
        <Container>
            {/* Render a list of category boxes based on the defined categories */}
            <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
                {categories.map((item) => (
                    <CategoryBox key={item.label} label={item.label} selected={category === item.label} icon={item.icon} />
                ))}
            </div>
        </Container>
    )
}

// Export the Categories component as the default export
export default Categories

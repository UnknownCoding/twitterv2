import React from 'react'
import { BeakerIcon } from '@heroicons/react/solid'

export const IconsStyle = ({Icon , text , active}) => {
    return (
        <div className={`text-[#d9d9d9] flex items-center xl:items-start text-xl space-x-3 xl:!ml-0 !ml-4 hoverAnimation ${active && "font-bold text-blue-500"}`}>
            <Icon className='h-7 hidden md:inline-flex'/>
            <span className='hidden xl:inline-flex'>{text}</span>
        </div>
    )
}

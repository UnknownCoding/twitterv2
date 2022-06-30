import { BellIcon, BookmarkIcon, ClipboardListIcon, DotsCircleHorizontalIcon, DotsHorizontalIcon, HashtagIcon, HomeIcon, InboxIcon, UserIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React from 'react'
import { IconsStyle } from './IconsStyle'
import {useSession,signOut} from 'next-auth/react'

const Sidebar = () => {
    const {data:session} = useSession()

    return (
        <div className='hidden text-white md:inline-flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full overflow-y-auto scrollbar-hide'>
            <div className='hoverAnimation flex items-center justify-center w-14 h-14 !p-0 xl:ml-20 '>
                <Image src="https://rb.gy/ogau5a" width={30} height={30}/>
            </div>
            <div className='space-y-2.5 mt-4 xl:ml-20 '>
                <IconsStyle text='Home' Icon={HomeIcon} active={true}/>
                <IconsStyle text='Explore' Icon={HashtagIcon}/>
                <IconsStyle text='Notification' Icon={BellIcon}/>
                <IconsStyle text='Messages' Icon={InboxIcon}/>
                <IconsStyle text='Bookmarks' Icon={BookmarkIcon}/>
                <IconsStyle text='Lists' Icon={ClipboardListIcon}/>
                <IconsStyle text='Profile' Icon={UserIcon}/>
                <IconsStyle text='More' Icon={DotsCircleHorizontalIcon}/>
            </div>
            <button className='mt-10 hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[84px] p-3 text-lg font-bold shadow-md hover:bg-[#1a8cd8] outline-none' > Tweet</button>
            <div className='flex items-center justify-center xl:ml-16 xl:-mr-5 !mt-24 '>
                <img src={session?.user?.image} className='h-10 w-10 rounded-full xl:mr-2.5 cursor-pointer' onClick={signOut}/>
                <div className='hidden xl:inline leading-5'>
                    <h4 className='font-bold'>{session?.user?.name}</h4>
                    <p className='text-[#6e767d]'>@{session?.user?.tag}</p>
                </div>
                <DotsHorizontalIcon className='h-5 hidden xl:inline ml-8'/>
            </div>
        </div>
    )
}

export default Sidebar
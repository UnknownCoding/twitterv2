import { SearchIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import React from 'react'
import Trending from './Trending'

const Widget = ({trendingResults,followResults}) => {
    return (
        <div className='hidden lg:inline ml-5 xl:w-[570px] py-1 space-y-5'>
            <div className='sticky top-0 py-1.5 bg-black z-50 w-11/12 xl:w-9/12 '>
                <div className='flex items-center bg-[#202327] p-3 rounded-full relative'>
                    <SearchIcon className='text-gray-500 z-52 h-5 '/>
                    {/* what is this inset about  */}
                    <input type='text' placeholder='Search' className='bg-transparent placeholder-gray-500 outline-none text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent w-full focus:border-[#1d9bf0] 
                    rounded-full focus:bg-black focus:shadow-lg'/>
                </div>
            </div>
            <div className='text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-9/12'>
                <h4 className='font-bold text-xl px-4'>What's Happening</h4>
                {trendingResults.map((results,i)=>(
                    <Trending key={i} result={results} /> 
                ))}
                <button className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center outline-none justify-between w-full text-[#1d9bf0]'>Show More</button>
            </div>
            <div className='text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-11/12'>
                <h4 className='font-bold text-xl px-4'>Who to follow</h4>
                {followResults.map((results,i)=>(
                    <div key={i} className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center outline-none w-full '>
                        <Image src={results?.userImg} className="rounded-full" objectFit='cover' width='40' height='40'/>
                        <div className='ml-4 leading-5 group'>
                            <h4 className='font-bold group-hover:underline'>{results?.username}</h4>
                            <h5 className='text-gray-500 text-[15px] '>{results?.tag}</h5>
                        </div>
                        <button className='ml-auto bg-white text-black outline-none rounded-full text-sm py-1.5 px-3.5 font-bold'>Follow</button>
                    </div>
                ))}
                <button className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center outline-none justify-between w-full text-[#1d9bf0]'>Show More</button>
            </div>
        </div>
    )
}

export default Widget
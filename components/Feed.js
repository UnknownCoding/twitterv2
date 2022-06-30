import { SparklesIcon } from '@heroicons/react/outline'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Input from './Input'
import Posts from './Posts'

const Feed = () => {
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        return onSnapshot(query(collection(db,'posts'),orderBy('timestamp','desc')),(snapshot)=>{
            setPosts(snapshot.docs)
        })
    },[db])

    return (
        <div className='text-white flex-grow max-w-2xl border-r border-l border-gray-700  sm:ml-[73px] md:ml-[180px] xl:ml-[340px] scrollbar-hide'>
            <div className='text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 top-0 z-50 bg-black border-b border-gray-700'>
                <h2 className='text-lg sm:text-xl font-bold '> Home</h2>
                <div className='flex items-center justify-center w-9 h-9 ml-auto'>
                    <SparklesIcon className='h-5 text-white inline'/>
                </div>
            </div>
            <Input/>
            <div className='pb-72 scrollbar-hide'>
                {posts.map((post)=>(
                    <Posts key={post?.id} id={post?.id} post={post.data()}/>
                ))}
            </div>
        </div>
    )
}

export default Feed
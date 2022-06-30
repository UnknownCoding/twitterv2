import { CalendarIcon, ChartBarIcon, EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/outline'
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import dynamic from "next/dynamic";
import data from '@emoji-mart/data';
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import {useSession} from 'next-auth/react'

// import { Picker } from 'emoji-mart';
const Picker = dynamic(() => import("emoji-mart"), { ssr: false });

import { db , storage} from '../firebase';
import { addDoc,collection,doc,updateDoc,serverTimestamp } from 'firebase/firestore';

const Input = () => {
    const {data:session} = useSession()
    const [inputVal,setInputVal] = useState("")
    const [selectedFile,setSelectedFile] = useState(null)
    const [showEmoji,setShowEmoji] = useState(false)
    const [loading,setIsLoading] = useState(false)
    const filepicker = useRef(null)
    
    const addEmoji = ()=>{
        
    }

    const addImageToState = (e)=>{
        e.preventDefault()
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload=(readerEvent)=>{
            setSelectedFile(readerEvent.target.result);
        };
    }

    const sendPost = async (e)=>{
        e.preventDefault()
        if(loading) return;
        setIsLoading(true)

        const docRef = await addDoc(collection(db,'posts'),{
            id:session.user.uid,
            username:session.user.name,
            userImg:session.user.image,
            tag:session.user.tag,
            text:inputVal,
            timestamp:serverTimestamp()
        });

        const imageref= ref(storage,`posts/${docRef.id}/image`)

        if(selectedFile){
            await uploadString(imageref,selectedFile,'data_url')
            .then(async (snapshot) => {
                const downloadUrl = await getDownloadURL(imageref)
                await updateDoc(doc(db,'posts',docRef.id),{
                    image:downloadUrl
                })
            })
        }

        setIsLoading(false)
        setSelectedFile(null)
        setInputVal("")

    }

    return (
        <div className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll scrollbar-hide ${loading && 'opacity-60'}`} >
            <img src={session?.user?.image} className='h-11 w-11 rounded-full  cursor-pointer z-100'/>
            {/* divide y creates a border bottom {not sure on that one } automatically for all the children that inside a parents component  */}
            <div className='w-full divide-y divide-gray-700'>
                <div className={`${selectedFile && 'pb-7'} ${inputVal && 'space-y-2.5'}`}>
                    <textarea   value={inputVal} 
                                rows='2' 
                                className='bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]'
                                placeholder="What's in your mind ?"
                                onChange={(e)=>setInputVal(e.target.value)}/>
                    {selectedFile && (
                    <div className='relative'>
                        <div onClick={()=>setSelectedFile(null)} className='absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'>
                            <XIcon className='text-white h-5 w-5 '/>
                        </div>
                        <img src={selectedFile} alt='' className='rounded-2xl max-h-80 object-contain' />
                    </div>
                    )}
                </div>
                
                {!loading && (
                    <div className='flex items-center justify-between pt-2.5'>
                        <div className='flex items-center'>
                            <div className='icon'>
                                <PhotographIcon className='h-[22px] text-[#1d9bf0]' onClick={()=>filepicker.current.click()}/>
                                <input type='file' className='hidden' onChange={addImageToState} ref={filepicker}/>
                            </div>
                            <div className='icon rotate-90'>
                                <ChartBarIcon className='h-[22px] text-[#1d9bf0]'/>
                            </div>
                            <div className='icon' onClick={()=>setShowEmoji(!showEmoji)}>
                                <EmojiHappyIcon className='h-[22px] text-[#1d9bf0]'/>
                            </div>
                            <div className='icon'>
                                <CalendarIcon className='h-[22px] text-[#1d9bf0]'/>
                            </div>
                            {showEmoji && (
                                // <Picker
                                // onSelect={addEmoji}
                                // style={{
                                //     position:'absolute',
                                //     marginTop: '465px',
                                //     marginLeft: -40,
                                //     maxWidth: '320px',
                                //     borderRadius:'20px'
                                // }}
                                // theme="dark"
                                // />
                                <div></div>)}
                        </div> 
                        <button className='bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8]
                                            disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default'
                                disabled={!inputVal.trim() && !selectedFile}
                                onClick={sendPost}>
                            Tweet
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Input
import Head from 'next/head'
import React from 'react'
import Modal from '../components/Modal'
import Sidebar from '../components/Sidebar'
import Comment from '../components/Comment'
import Feed from '../components/Feed'
import { useRecoilState } from "recoil";
import { modalState } from '../atoms/modalAtom'
import  { useEffect, useState } from 'react'
import {useSession,getSession,getProviders} from 'next-auth/react'
import {useRouter } from 'next/router'
import { db } from '../firebase'
import Login from '../components/Login'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import Posts from '../components/Posts'
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';

const PostPage = ({trendingResults,followResults,providers}) => {
    const {data:session} = useSession()
    const [modal,setModal] = useRecoilState(modalState)
    const [posts,setPosts] = useState(null)
    const [comments,setComments] = useState([])
    const Router = useRouter()
    const {id} = Router?.query
    
    useEffect(()=>{
        return onSnapshot(collection(db,'posts',id,'comments'),(snapshot)=>{
            setComments(snapshot.docs)
        })    
    },[db,id])

    useEffect(()=>{
        return onSnapshot(doc(db,'posts',id),(snapshot)=>{
            setPosts(snapshot.data())
        })
    },[db,id])

    if(!session) return <Login providers={providers}/>

    return (
        <div >
        <Head>
            <title>
                {posts?.username} on Twitter : {posts?.text}
            </title>
        </Head>
        {/* max width and then margin auto is needed !  */}
        <div className='flex bg-black min-h-screen'>
            <Sidebar/>
            <div className='flex-grow max-w-2xl border-l border-r border-gray-700 sm:ml-[73px] md:ml-[180px] xl:ml-[340px]'>
                <div className='flex items-center px-1.5 py-2 border-b border-r border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black'>
                    <div className='hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0'>
                        <ArrowLeftIcon className='h-5 text-white' onClick={()=> Router.push('/')}/>
                    </div>
                    Tweet
                </div>
                <Posts id={id} post={posts} postIsPage='true'/>
                {comments?.length > 0 && (
                    <div className='pb-72'>
                        {comments?.map((comment)=>(
                            <Comment  key={comment?.id} id={comment?.id} comment={comment?.data()}/>
                        ))}
                    </div>
                )}
            </div>
            {/* widgets */}
        </div>
        {modal && <Modal/>}
        </div>
        )
}

export default PostPage

export async function getServerSideProps(context) {
    // const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    // (res) => res.json()
    // );
    // const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    // (res) => res.json()
    // );
    const providers = await getProviders();
    const session = await getSession(context);

    return {
    props: {
        // trendingResults,
        // followResults,
        providers,
        session,
        },
    };
}

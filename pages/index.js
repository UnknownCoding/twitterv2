import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import styles from '../styles/Home.module.css'
import {useSession,getSession,getProviders} from 'next-auth/react'
import Login from '../components/Login'
import Modal from '../components/Modal'
import { modalState  } from '../atoms/modalAtom'
import { useRecoilState } from "recoil";
import Widget from '../components/Widget'


export default function Home({trendingResults,followResults,providers}) {
  const {data:session} = useSession()
  const [modal,isModal] = useRecoilState(modalState)

  if(!session) return <Login providers={providers}/>
  console.log(session)
  return (
    <div className='scrollbar-hide'>
      <Head>
        <title>Twitter</title>
      </Head>
      {/* max width and then margin auto is needed !  */}
      <div className='flex bg-black min-h-screen'>
        <Sidebar/>
        <Feed/>
        <Widget trendingResults={trendingResults} followResults={followResults}/>
      </div>
      {modal && <Modal/>}
    </div>
  )
}

export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}

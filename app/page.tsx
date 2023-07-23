'use client';
import Image from 'next/image'
import styles from './page.module.css'
import { Inter } from 'next/font/google'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { Secondary } from './components/Button/button'
import ChatPanelLayout from './components/ChatPanel/layout'
import VideoPanelLayout from './components/VideoPanel/page'
import anon from '@/public/anonymous-user.svg'
import logo from '@/public/logo.png'

const inter = Inter({ weight: ['700'], subsets: ['latin'], display: 'swap' })

export default function Home() {
  const { data: session } = useSession({
    required: true,
  })

  return session?.user &&
    (
      <>
        <nav className={styles['navbar']}>
          <div className={styles['navbar-left']}>
            <Image src={logo} alt='logo' width={50} height={50} className={styles['navbar-logo']} />
            <h3 className={`${inter.className} ${styles['navbar-brand']}`}>1-mile</h3>
          </div>
          <div className={styles['navbar-right']}>
            <div className={styles['navbar-right-user']}>
              <Image src={session?.user?.image ?? anon} alt='user pfp' width={50} height={50} />
              <span>{session?.user?.name ?? 'Unknown User'}</span>
            </div>
            <Secondary label="Sign Out" handleClick={signOut} />
          </div>
        </nav>
        <main className={styles.main}>
          <VideoPanelLayout />
          <ChatPanelLayout />
        </main>
      </>
    ) || (
      <main className={styles.main}>
        <p>
          Please Login to Continue
        </p>
      </main>
    )
}

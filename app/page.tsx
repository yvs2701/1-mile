'use client';
import styles from './page.module.css'
import { useSession } from 'next-auth/react'
import Router from 'next/navigation'
import ChatPanelLayout from './components/ChatPanel/layout'
import VideoPanelLayout from './components/VideoPanel/page'

export default function Home() {
  const { data: session } = useSession({
    required: true,
  })

  return session?.user &&
    (
      <main className={styles.main}>
        <VideoPanelLayout />
        <ChatPanelLayout />
        <p>
          Logged In as: {session?.user?.name ?? 'Unknown User'}
        </p>
      </main>
    ) || (
      <main className={styles.main}>
        <p>
          Please Login to Continue
        </p>
      </main>
    )
}

'use client';
import styles from './page.module.css'
import ChatPanelLayout from './components/ChatPanel/layout'
import VideoPanelLayout from './components/VideoPanel/page'

export default function Home() {
  return (
    <main className={styles.main}>
      <VideoPanelLayout />
      <ChatPanelLayout />
    </main>
  )
}

'use client';
import styles from './page.module.css'
import ChatActions from './components/ChatPanel/chatActions';
import MessagePanel from './components/ChatPanel/messageScreen';
import ChatPanelLayout from './components/ChatPanel/layout';
import VideoPanelLayout from './components/VideoPanel/layout';

export default function Home() {
  return (
    <main className={styles.main}>
      <VideoPanelLayout />
      <ChatPanelLayout />
    </main>
  )
}

/* Snippets:
<Image
  src="/vercel.svg"
  alt="Vercel Logo"
  className={styles.vercelLogo}
  width={100}
  height={24}
  priority
/>
*/
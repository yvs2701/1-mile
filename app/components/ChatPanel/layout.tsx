import styles from './chatpanel.module.css'
import MessagePanel from './messageScreen'
import ChatActions from './chatActions'

export default function ChatPanelLayout({ children }: { children?: React.ReactNode }) {
  return (
    <section className={styles["chat-screen"]}>
      <MessagePanel />
      <ChatActions />
      {children ?? ''}
    </section>
  )
}

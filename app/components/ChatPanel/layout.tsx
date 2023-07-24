import styles from './chatpanel.module.css'
import MessagePanel from './chatMessages'
import ChatActions from './chatActions'

type TMessage = {
  userId: string
  message: string | undefined
}

type TProps = {
  user: string
  handleNextClick: () => Promise<void>
  handleSubmitClick: (e: React.FormEvent) => Promise<void>
  messages: TMessage[]
}

export default function ChatPanelLayout({ user, messages, handleNextClick, handleSubmitClick }: TProps) {
  return (
    <section className={styles["chat-screen"]}>
      <MessagePanel user={user} messages={messages} />
      <ChatActions handleNextClick={handleNextClick} handleSubmitClick={handleSubmitClick} />
    </section>
  )
}

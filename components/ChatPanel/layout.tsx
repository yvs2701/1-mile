'use client';
import styles from './chatpanel.module.css'
import MessagePanel from './chatMessages'
import ChatActions from './chatActions'
import { Dispatch, SetStateAction } from 'react';

type TMessage = {
  userId: string
  message: string | undefined
}

type TProps = {
  user: string
  messageInput: string
  setMessageInput: Dispatch<SetStateAction<string>>
  handleNextClick: () => Promise<void>
  handleSubmitClick: (e: React.MouseEvent<HTMLElement>) => Promise<void>
  messages: TMessage[]
}

export default function ChatPanelLayout({ user, messages, messageInput , setMessageInput , handleNextClick, handleSubmitClick }: TProps) {
  return (
    <section className={styles["chat-screen"]}>
      <MessagePanel user={user} messages={messages} />
      <ChatActions messageInput={messageInput} setMessageInput={setMessageInput} handleNextClick={handleNextClick} handleSubmitClick={handleSubmitClick} />
    </section>
  )
}

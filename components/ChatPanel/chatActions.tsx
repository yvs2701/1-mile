'use client';
import styles from './chatActions.module.css'
import { Primary, Secondary } from '../Button/button'
import { Dispatch, SetStateAction } from 'react'
import { Inter } from 'next/font/google';

type TProps = {
  messageInput: string
  setMessageInput: Dispatch<SetStateAction<string>>
  handleNextClick: () => Promise<void>
  handleSubmitClick: (e: React.MouseEvent<HTMLElement>) => Promise<void>
}

const inter = Inter({ weight: ['400'], subsets: ['latin'], display: 'swap' })

export default function ChatActions({ messageInput, setMessageInput, handleNextClick, handleSubmitClick }: TProps) {
  return (
      <div className={styles.chatActions}>
        <Secondary label="Next" subtitle="(Esc)" handleClick={handleNextClick} />
        <textarea value={messageInput}
          className={`${inter.className} ${styles.chatbar}`}
          placeholder="Write a message..."
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessageInput(e.target.value)}
        />
        <Primary label="Send" subtitle="(&#8984; + Enter)" handleClick={handleSubmitClick} />
      </div>
  )
}
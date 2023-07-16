'use client';
import styles from './chatActions.module.css'
import Template from './template';
import { Primary, Secondary } from '../Button/button'
import { useState } from 'react'

export default function ChatActions() {
  const [message, setMessage] = useState('');

  return (
      <div className={styles.chatActions}>
        <Secondary label="Next" subtitle="(Esc)" handleClick={() => console.log('Next Button Clicked')} />
        <textarea value={message}
          className={styles.chatbar}
          placeholder="Write a message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <Primary label="Send" subtitle="(&#8984; + Enter)" handleClick={() => console.log('Send Button Clicked')} />
      </div>
  )
}
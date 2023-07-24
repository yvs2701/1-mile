'use client';
import styles from './chatMessages.module.css'

type TMessage = {
  userId: string
  message: string | undefined
}

export default function MessagePanel({ user, messages }: { user: string, messages: TMessage[] }) {

  return (
    <div className={styles["message-screen"]}>
      <div className={styles["scrollable"]}>
        {
          messages.map((mssg, index) => {
            return (
              <div key={index} className={`${styles["mssg"]} ${(mssg.userId === user) ? styles["mssg-right"] : styles["mssg-left"]}`}>
                {mssg.message}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
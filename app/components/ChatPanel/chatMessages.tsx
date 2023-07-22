'use client';
import styles from './chatMessages.module.css'

export default function MessagePanel() {

  return (
    <div className={styles["message-screen"]}>
      <div className={styles["scrollable"]}>
        <div className={`${styles["mssg"]} ${styles["mssg-left"]}`}>
          {`Looooong Message...    Looooong Message...    Looooong Message...    Looooong Message... \nLooooong Message... \nLooooong Message... \n \
        \nLooooong Message... \nLooooong Message... \nLooooong Message... \nLooooong Message... \n`}
        </div>
        <div className={`${styles["mssg"]} ${styles["mssg-left"]}`}>
          {`Hi,\nIs the UI looking good? What say huh??\nTell me whenever you are free 👀`}
        </div>
        <div className={`${styles["mssg"]} ${styles["mssg-right"]}`}>
          {`Woah!!\nIt's looking awesome.\nAnd I will surely see you again!`}
        </div>
        <div className={`${styles["mssg"]} ${styles["mssg-left"]}`}>
          {`😊`}
        </div>
        <div className={`${styles["mssg"]} ${styles["mssg-right"]}`}>
          {`👌👌👌`}
        </div>
      </div>
    </div>
  )
}
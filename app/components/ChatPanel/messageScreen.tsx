'use client';
import styles from './messageScreen.module.css'

export default function MessagePanel() {

  return (
    <div className={styles["message-screen"]}>
      <div className={`${styles["mssg"]} ${styles["mssg-left"]}`}>
      Hi,
        Is the UI looking good? What say huh??
        Tell me whenever you are free 👀
      </div>
      <div className={`${styles["mssg"]} ${styles["mssg-right"]}`}>
      Woah!!
        It's looking awesome.
        And yup I will surely see you again!
      </div>
      <div className={`${styles["mssg"]} ${styles["mssg-left"]}`}>
        😊
      </div>
      <div className={`${styles["mssg"]} ${styles["mssg-right"]}`}>
        👌👌👌
      </div>
    </div>
  )
}
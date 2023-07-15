'use client';
import styles from './button.module.css'

export const Primary = ({ label, handleClick }: { label: String, handleClick: () => any }) => {
  return (
    <button
      className={`${styles.btn} ${styles["btn-primary"]}`}
      onClick={handleClick}
    >
      {label}
    </button>
  )
}

export const Secondary = ({ label, handleClick }: { label: String, handleClick: () => any }) => {
  return (
    <button
      className={`${styles.btn} ${styles["btn-secondary"]}`}
      onClick={handleClick}
    >
      {label}
    </button>
  )
}

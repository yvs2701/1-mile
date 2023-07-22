'use client';
import styles from './button.module.css'

export const Primary = ({ label, subtitle, handleClick }: { label: String, subtitle?: String, handleClick: (...args: any) => any }) => {
  return (
    <button
      className={`${styles.btn} ${styles["btn-primary"]}`}
      onClick={handleClick}
      data-subtitle={subtitle}
    >
      {label}
    </button>
  )
}

export const Secondary = ({ label, subtitle, handleClick }: { label: String, subtitle?: String, handleClick: (...args: any) => any }) => {
  return (
    <button
      className={`${styles.btn} ${styles["btn-secondary"]}`}
      onClick={handleClick}
      data-subtitle={subtitle}
    >
      {label}
    </button>
  )
}

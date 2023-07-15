'use client';
import Image from 'next/image'
import styles from './page.module.css'
import { Primary, Secondary } from './components/Button/button'

export default function Home() {
  return (
    <main className={styles.main}>
      I am working!!
      <Primary label="Send" handleClick={() => console.log('Primary Button Clicked')} />
      <Secondary label="Next" handleClick={() => console.log('Secondary Button Clicked')} />
    </main>
  )
}

/* Snippets:
<Image
  src="/vercel.svg"
  alt="Vercel Logo"
  className={styles.vercelLogo}
  width={100}
  height={24}
  priority
/>
*/
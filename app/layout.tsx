import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from '@/components/AuthProvider/provider'

const inter = Inter({ weight: ['400'], subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: '1-mile',
  description: 'Discover strangers, make friends!! ',
  icons: {
    icon: '/favicon.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

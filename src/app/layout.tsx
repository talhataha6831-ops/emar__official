import './styles/globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'EMAR — DEFINE YOUR SIGNATURE',
  description: 'Official EMAR luxury store',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-emar-obsidian`}>{children}</body>
    </html>
  )
}

// app/layout.tsx
import { PT_Serif, Arimo } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

const ptSerif = PT_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ptserif',
  display: 'swap',
})

const arimo = Arimo({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-arimo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lexora',
  description: 'An application developed by Paul, John, and Denzell',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ptSerif.variable} ${arimo.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
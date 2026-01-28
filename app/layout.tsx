import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'IRCTC Expert Ticketing Agent',
  description: 'AI-powered ticket booking optimization for Indian Railways',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

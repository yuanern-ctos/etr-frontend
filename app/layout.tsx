import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AWS Amplify Next.js Fullstack App',
  description: 'A fullstack Next.js application with AWS Amplify backend integration for authentication and data management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'
import './assets/katex/katex.css'

export const metadata: Metadata = {
  title: 'Adaptive feedback for students answer (Prototype)',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Resto Dino',
  description: 'Table Booking for Resto Dino',
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

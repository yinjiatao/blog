import type { Metadata } from 'next'
import { Geist_Mono } from 'next/font/google'
import './globals.css'

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '尹家韬',
  description: '探索自我提升、超级个体、一人公司与产品增长的思考与实践。',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body className={`${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Last Frost Date Checker | When to Plant Tomatoes, Peppers & More',
  description: 'Find out when it\'s safe to move tomatoes, peppers, courgettes and tender plants outside. Location-based frost predictions and cold weather email alerts for UK gardeners.',
  keywords: 'last frost date UK, when to plant tomatoes outside, frost checker, planting calendar, tender plants UK, when to plant peppers outside',
  authors: [{ name: 'Grow Safe Guide' }],
  openGraph: {
    title: 'Last Frost Date Checker | When to Plant Tomatoes, Peppers & More',
    description: 'Find out when it\'s safe to move tomatoes, peppers, courgettes and tender plants outside. Location-based frost predictions and cold weather email alerts for UK gardeners.',
    type: 'website',
    url: 'https://growsafeguide.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Last Frost Date Checker | When to Plant Tomatoes, Peppers & More',
    description: 'Find out when it\'s safe to move tomatoes, peppers, courgettes and tender plants outside.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1916647438314976"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

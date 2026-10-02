import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter_Tight, JetBrains_Mono } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Cumble — Launchpads on your terms.',
    template: '%s - Cumble',
  },
  description:
    'Choose how creator fees are shared. One rule for every coin on your Cumble. Built on pump.fun.',
  generator: 'v0.app',
  icons: {
    icon: '/cumble-logo.png',
    apple: '/cumble-logo.png',
  },
  openGraph: {
    title: 'Cumble — Launchpads on your terms.',
    description: 'Choose how creator fees are shared. Built on pump.fun.',
    images: ['/cumble-logo.png'],
  },
  twitter: {
    card: 'summary',
    site: '@Cumblefun',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0e100e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${jetbrains.variable} bg-background`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

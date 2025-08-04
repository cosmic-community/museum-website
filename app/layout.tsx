import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import { getNavigationPages } from '@/lib/cosmic'
import { Page } from '@/types'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Museum - Discover Art, Culture & Heritage',
  description: 'Explore 5,000 years of human creativity through world-class exhibitions, educational programs, and cultural experiences.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let navPages: Page[] = []
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  try {
    navPages = await getNavigationPages() as Page[]
  } catch (error) {
    console.error('Error fetching navigation pages:', error)
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header navPages={navPages} />
        <main>{children}</main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}
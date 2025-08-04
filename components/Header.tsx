import Link from 'next/link'
import { getNavigationPages } from '@/lib/cosmic'
import { Page } from '@/types'

export default async function Header() {
  let navPages: Page[] = [];
  
  try {
    navPages = await getNavigationPages() as Page[];
  } catch (error) {
    console.error('Error fetching navigation pages:', error);
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary-800">
            Museum
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/exhibits" 
              className="text-gray-700 hover:text-primary-700 font-medium transition-colors"
            >
              Exhibits
            </Link>
            <Link 
              href="/events" 
              className="text-gray-700 hover:text-primary-700 font-medium transition-colors"
            >
              Events
            </Link>
            <Link 
              href="/staff" 
              className="text-gray-700 hover:text-primary-700 font-medium transition-colors"
            >
              Staff
            </Link>
            
            {/* Dynamic pages from CMS */}
            {navPages.map((page) => (
              <Link 
                key={page.id}
                href={`/${page.slug}`}
                className="text-gray-700 hover:text-primary-700 font-medium transition-colors"
              >
                {page.title}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Page } from '@/types'

interface HeaderProps {
  navPages?: Page[]
}

export default function Header({ navPages = [] }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = () => {
      setIsMobileMenuOpen(false)
    }

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  return (
    <header className="sticky top-0 bg-white shadow-sm border-b relative z-40">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary-800">
            Museum
          </Link>

          {/* Desktop Navigation */}
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
          <button 
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }}
            aria-label="Toggle mobile menu"
          >
            <svg 
              className={`w-6 h-6 transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg z-50">
            <nav className="py-4 px-4 space-y-4">
              <Link 
                href="/exhibits"
                className="block text-gray-700 hover:text-primary-700 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Exhibits
              </Link>
              <Link 
                href="/events"
                className="block text-gray-700 hover:text-primary-700 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                href="/staff"
                className="block text-gray-700 hover:text-primary-700 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Staff
              </Link>
              
              {/* Dynamic pages from CMS */}
              {navPages.map((page) => (
                <Link 
                  key={page.id}
                  href={`/${page.slug}`}
                  className="block text-gray-700 hover:text-primary-700 font-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {page.title}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
// app/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPage, getPages } from '@/lib/cosmic'
import { Page } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const pages = await getPages() as Page[]
    return pages.map((page) => ({
      slug: page.slug,
    }))
  } catch (error) {
    console.error('Error generating static params for pages:', error)
    return []
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  
  try {
    const page = await getPage(slug) as Page | null
    
    if (!page) {
      return {
        title: 'Page Not Found',
      }
    }

    return {
      title: `${page.metadata.title} - Museum`,
      description: page.metadata.content?.replace(/<[^>]*>/g, '').substring(0, 160) || `${page.metadata.title} - Museum`,
    }
  } catch (error) {
    return {
      title: 'Page Not Found',
    }
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  
  let page: Page | null = null

  try {
    page = await getPage(slug) as Page | null
  } catch (error) {
    console.error('Error fetching page:', error)
  }

  if (!page) {
    notFound()
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-primary-600">Home</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900">{page.metadata.title}</span>
            </li>
          </ol>
        </nav>

        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          {page.metadata.featured_image && (
            <div className="mb-8">
              <img
                src={`${page.metadata.featured_image.imgix_url}?w=2000&h=600&fit=crop&auto=format,compress`}
                alt={page.metadata.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {page.metadata.title}
            </h1>
          </div>

          {/* Page Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
            {page.metadata.content ? (
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: page.metadata.content }}
              />
            ) : (
              <p className="text-gray-600 text-lg text-center">
                Content for this page is not available.
              </p>
            )}

            {/* Call to Action */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Ready to Visit?
              </h3>
              <p className="text-gray-600 mb-6">
                Plan your visit to experience everything our museum has to offer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/exhibits" className="btn-primary text-center">
                  Current Exhibitions
                </Link>
                <Link href="/events" className="btn-secondary text-center">
                  Upcoming Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
// app/exhibits/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getExhibit, getExhibits } from '@/lib/cosmic'
import { Exhibit } from '@/types'

interface ExhibitPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const exhibits = await getExhibits() as Exhibit[]
    return exhibits.map((exhibit) => ({
      slug: exhibit.slug,
    }))
  } catch (error) {
    console.error('Error generating static params for exhibits:', error)
    return []
  }
}

export async function generateMetadata({ params }: ExhibitPageProps) {
  const { slug } = await params
  
  try {
    const exhibit = await getExhibit(slug) as Exhibit | null
    
    if (!exhibit) {
      return {
        title: 'Exhibit Not Found',
      }
    }

    return {
      title: `${exhibit.metadata.title} - Museum`,
      description: exhibit.metadata.description?.replace(/<[^>]*>/g, '').substring(0, 160) || 'Museum exhibition',
    }
  } catch (error) {
    return {
      title: 'Exhibit Not Found',
    }
  }
}

export default async function ExhibitPage({ params }: ExhibitPageProps) {
  const { slug } = await params
  
  let exhibit: Exhibit | null = null

  try {
    exhibit = await getExhibit(slug) as Exhibit | null
  } catch (error) {
    console.error('Error fetching exhibit:', error)
  }

  if (!exhibit) {
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
              <Link href="/exhibits" className="hover:text-primary-600">Exhibits</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900">{exhibit.metadata.title}</span>
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="space-y-6">
            {exhibit.metadata.featured_image && (
              <div className="relative">
                <img
                  src={`${exhibit.metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                  alt={exhibit.metadata.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                    exhibit.metadata.status?.value === 'Current' 
                      ? 'bg-green-600' 
                      : exhibit.metadata.status?.value === 'Upcoming'
                      ? 'bg-blue-600'
                      : 'bg-gray-600'
                  }`}>
                    {exhibit.metadata.status?.value}
                  </span>
                </div>
              </div>
            )}

            {/* Gallery */}
            {exhibit.metadata.gallery && exhibit.metadata.gallery.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Gallery</h3>
                <div className="grid grid-cols-2 gap-4">
                  {exhibit.metadata.gallery.map((image: any, index: number) => (
                    <img
                      key={index}
                      src={`${image.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
                      alt={`${exhibit.metadata.title} gallery image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {exhibit.metadata.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                {exhibit.metadata.start_date && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>
                      {new Date(exhibit.metadata.start_date).toLocaleDateString()}
                      {exhibit.metadata.end_date && 
                        ` - ${new Date(exhibit.metadata.end_date).toLocaleDateString()}`
                      }
                    </span>
                  </div>
                )}
                
                {exhibit.metadata.location && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{exhibit.metadata.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {exhibit.metadata.description && (
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: exhibit.metadata.description }}
              />
            )}

            {/* Call to Action */}
            <div className="pt-6">
              <Link 
                href="/visit-us" 
                className="btn-primary inline-flex items-center"
              >
                Plan Your Visit
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Exhibits */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link 
            href="/exhibits"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Exhibitions
          </Link>
        </div>
      </div>
    </div>
  )
}
// app/events/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getEvent, getEvents } from '@/lib/cosmic'
import { Event } from '@/types'

interface EventPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const events = await getEvents() as Event[]
    return events.map((event) => ({
      slug: event.slug,
    }))
  } catch (error) {
    console.error('Error generating static params for events:', error)
    return []
  }
}

export async function generateMetadata({ params }: EventPageProps) {
  const { slug } = await params
  
  try {
    const event = await getEvent(slug) as Event | null
    
    if (!event) {
      return {
        title: 'Event Not Found',
      }
    }

    return {
      title: `${event.metadata.title} - Museum`,
      description: event.metadata.description?.replace(/<[^>]*>/g, '').substring(0, 160) || 'Museum event',
    }
  } catch (error) {
    return {
      title: 'Event Not Found',
    }
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params
  
  let event: Event | null = null

  try {
    event = await getEvent(slug) as Event | null
  } catch (error) {
    console.error('Error fetching event:', error)
  }

  if (!event) {
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
              <Link href="/events" className="hover:text-primary-600">Events</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900">{event.metadata.title}</span>
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full text-white ${
                  event.metadata.event_type?.value === 'Lecture' 
                    ? 'bg-blue-600'
                    : event.metadata.event_type?.value === 'Workshop'
                    ? 'bg-green-600'
                    : event.metadata.event_type?.value === 'Guided Tour'
                    ? 'bg-purple-600'
                    : 'bg-red-600'
                }`}>
                  {event.metadata.event_type?.value}
                </span>
                {event.metadata.registration_required && (
                  <span className="px-3 py-1 text-sm font-medium text-orange-800 bg-orange-100 rounded-full">
                    Registration Required
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                {event.metadata.title}
              </h1>
            </div>

            {/* Featured Image */}
            {event.metadata.event_image && (
              <div className="relative">
                <img
                  src={`${event.metadata.event_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                  alt={event.metadata.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Description */}
            {event.metadata.description && (
              <div>
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: event.metadata.description }}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Details Card */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Event Details</h3>
              <div className="space-y-4">
                {/* Date & Time */}
                {event.metadata.date_time && (
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mt-0.5 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="font-medium text-gray-900">Date & Time</div>
                      <div className="text-gray-600">{event.metadata.date_time}</div>
                    </div>
                  </div>
                )}

                {/* Location */}
                {event.metadata.location && (
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mt-0.5 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div className="font-medium text-gray-900">Location</div>
                      <div className="text-gray-600">{event.metadata.location}</div>
                    </div>
                  </div>
                )}

                {/* Price */}
                {event.metadata.price && (
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mt-0.5 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <div>
                      <div className="font-medium text-gray-900">Price</div>
                      <div className="text-gray-600">{event.metadata.price}</div>
                    </div>
                  </div>
                )}

                {/* Event Type */}
                <div className="flex items-start">
                  <svg className="w-5 h-5 mt-0.5 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900">Event Type</div>
                    <div className="text-gray-600">{event.metadata.event_type?.value}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration CTA */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-primary-900 mb-2">
                {event.metadata.registration_required ? 'Registration Required' : 'Join Us'}
              </h3>
              <p className="text-primary-700 mb-4">
                {event.metadata.registration_required 
                  ? 'Secure your spot for this event by registering in advance.'
                  : 'No registration required. Simply show up and enjoy!'
                }
              </p>
              <Link 
                href="/visit-us" 
                className="btn-primary w-full text-center block"
              >
                {event.metadata.registration_required ? 'Register Now' : 'Plan Your Visit'}
              </Link>
            </div>

            {/* More Events */}
            <div>
              <h3 className="text-lg font-bold mb-4">More Events</h3>
              <Link 
                href="/events"
                className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
              >
                View All Events
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Events */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link 
            href="/events"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Events
          </Link>
        </div>
      </div>
    </div>
  )
}
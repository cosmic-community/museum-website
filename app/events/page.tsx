import { getEvents } from '@/lib/cosmic'
import { Event } from '@/types'
import EventCard from '@/components/EventCard'

export const metadata = {
  title: 'Events - Museum',
  description: 'Join us for lectures, workshops, guided tours, and special events that bring art and culture to life.',
}

export default async function EventsPage() {
  let events: Event[] = [];

  try {
    events = await getEvents() as Event[];
  } catch (error) {
    console.error('Error fetching events:', error);
  }

  // Group events by type
  const lectures = events.filter(event => event.metadata?.event_type?.key === 'lecture');
  const workshops = events.filter(event => event.metadata?.event_type?.key === 'workshop');
  const tours = events.filter(event => event.metadata?.event_type?.key === 'tour');
  const specialEvents = events.filter(event => event.metadata?.event_type?.key === 'special');

  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Events</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us for lectures, workshops, guided tours, and special events that bring art and culture to life
          </p>
        </div>

        {/* All Events */}
        {events.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No events scheduled at this time.</p>
          </div>
        )}

        {/* Event Categories Info */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Event Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Lectures</h3>
              <p className="text-sm text-gray-600">Educational talks by art historians and experts</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Workshops</h3>
              <p className="text-sm text-gray-600">Hands-on creative experiences for all ages</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Guided Tours</h3>
              <p className="text-sm text-gray-600">Expert-led tours of our exhibitions</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Special Events</h3>
              <p className="text-sm text-gray-600">Galas, fundraisers, and exclusive gatherings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
import Link from 'next/link'
import { Event } from '@/types'

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const eventImage = event.metadata?.event_image;
  const eventType = event.metadata?.event_type;
  
  const getEventTypeColor = (typeKey: string) => {
    switch (typeKey) {
      case 'lecture':
        return 'bg-blue-100 text-blue-800';
      case 'workshop':
        return 'bg-green-100 text-green-800';
      case 'tour':
        return 'bg-purple-100 text-purple-800';
      case 'special':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      {eventImage && (
        <div className="aspect-video overflow-hidden">
          <img
            src={`${eventImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={event.title}
            width="400"
            height="225"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          {eventType && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(eventType.key)}`}>
              {eventType.value}
            </span>
          )}
          {event.metadata?.registration_required && (
            <span className="text-sm text-orange-600 font-medium">
              Registration Required
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-3">
          <Link 
            href={`/events/${event.slug}`}
            className="hover:text-primary-700 transition-colors"
          >
            {event.title}
          </Link>
        </h3>
        
        <div className="text-gray-700 mb-4"
             dangerouslySetInnerHTML={{ 
               __html: event.metadata?.description?.substring(0, 150) + '...' || ''
             }}
        />
        
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          {event.metadata?.date_time && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {event.metadata.date_time}
            </div>
          )}
          
          {event.metadata?.location && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.metadata.location}
            </div>
          )}
          
          {event.metadata?.price && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              {event.metadata.price}
            </div>
          )}
        </div>
        
        <Link 
          href={`/events/${event.slug}`}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
        >
          View Details
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
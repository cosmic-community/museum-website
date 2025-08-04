import Link from 'next/link'
import { Exhibit } from '@/types'

interface ExhibitCardProps {
  exhibit: Exhibit;
}

export default function ExhibitCard({ exhibit }: ExhibitCardProps) {
  const featuredImage = exhibit.metadata?.featured_image;
  const status = exhibit.metadata?.status;
  
  const getStatusColor = (statusKey: string) => {
    switch (statusKey) {
      case 'current':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'past':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      {featuredImage && (
        <div className="aspect-video overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={exhibit.title}
            width="400"
            height="225"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          {status && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status.key)}`}>
              {status.value}
            </span>
          )}
          {exhibit.metadata?.location && (
            <span className="text-sm text-gray-600">
              {exhibit.metadata.location}
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-3">
          <Link 
            href={`/exhibits/${exhibit.slug}`}
            className="hover:text-primary-700 transition-colors"
          >
            {exhibit.title}
          </Link>
        </h3>
        
        <div className="text-gray-700 mb-4"
             dangerouslySetInnerHTML={{ 
               __html: exhibit.metadata?.description?.substring(0, 150) + '...' || ''
             }}
        />
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>
            {exhibit.metadata?.start_date && `${formatDate(exhibit.metadata.start_date)}`}
            {exhibit.metadata?.end_date && ` - ${formatDate(exhibit.metadata.end_date)}`}
          </span>
        </div>
        
        <Link 
          href={`/exhibits/${exhibit.slug}`}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
        >
          Learn More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
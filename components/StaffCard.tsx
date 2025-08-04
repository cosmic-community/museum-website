import Link from 'next/link'
import { Staff } from '@/types'

interface StaffCardProps {
  staff: Staff;
}

export default function StaffCard({ staff }: StaffCardProps) {
  const photo = staff.metadata?.photo;
  const department = staff.metadata?.department;

  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      {photo && (
        <div className="aspect-square overflow-hidden">
          <img
            src={`${photo.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={staff.metadata?.name || staff.title}
            width="300"
            height="300"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="mb-3">
          {department && (
            <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
              {department.value}
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-1">
          <Link 
            href={`/staff/${staff.slug}`}
            className="hover:text-primary-700 transition-colors"
          >
            {staff.metadata?.name || staff.title}
          </Link>
        </h3>
        
        {staff.metadata?.position && (
          <p className="text-primary-600 font-medium mb-3">
            {staff.metadata.position}
          </p>
        )}
        
        {staff.metadata?.bio && (
          <div className="text-gray-700 mb-4"
               dangerouslySetInnerHTML={{ 
                 __html: staff.metadata.bio.substring(0, 120) + '...'
               }}
          />
        )}
        
        <div className="flex items-center justify-between">
          <Link 
            href={`/staff/${staff.slug}`}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View Profile
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          {staff.metadata?.email && (
            <a 
              href={`mailto:${staff.metadata.email}`}
              className="text-gray-500 hover:text-primary-600 transition-colors"
              title="Send email"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
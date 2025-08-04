// app/staff/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getStaffMember, getStaff } from '@/lib/cosmic'
import { Staff } from '@/types'

interface StaffPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const staff = await getStaff() as Staff[]
    return staff.map((member) => ({
      slug: member.slug,
    }))
  } catch (error) {
    console.error('Error generating static params for staff:', error)
    return []
  }
}

export async function generateMetadata({ params }: StaffPageProps) {
  const { slug } = await params
  
  try {
    const staffMember = await getStaffMember(slug) as Staff | null
    
    if (!staffMember) {
      return {
        title: 'Staff Member Not Found',
      }
    }

    return {
      title: `${staffMember.metadata.name} - ${staffMember.metadata.position} - Museum`,
      description: staffMember.metadata.bio?.replace(/<[^>]*>/g, '').substring(0, 160) || `${staffMember.metadata.name}, ${staffMember.metadata.position} at the Museum`,
    }
  } catch (error) {
    return {
      title: 'Staff Member Not Found',
    }
  }
}

export default async function StaffPage({ params }: StaffPageProps) {
  const { slug } = await params
  
  let staffMember: Staff | null = null

  try {
    staffMember = await getStaffMember(slug) as Staff | null
  } catch (error) {
    console.error('Error fetching staff member:', error)
  }

  if (!staffMember) {
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
              <Link href="/staff" className="hover:text-primary-600">Staff</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900">{staffMember.metadata.name}</span>
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-8">
              {/* Photo */}
              {staffMember.metadata.photo && (
                <div className="mb-6">
                  <img
                    src={`${staffMember.metadata.photo.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                    alt={staffMember.metadata.name}
                    className="w-48 h-48 object-cover rounded-full mx-auto shadow-lg"
                  />
                </div>
              )}

              {/* Basic Info */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {staffMember.metadata.name}
                </h1>
                <p className="text-lg text-primary-600 font-medium mb-4">
                  {staffMember.metadata.position}
                </p>
                
                {staffMember.metadata.department && (
                  <div className="inline-block">
                    <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                      {staffMember.metadata.department.value}
                    </span>
                  </div>
                )}
              </div>

              {/* Contact */}
              {staffMember.metadata.email && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                    Contact
                  </h3>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a 
                      href={`mailto:${staffMember.metadata.email}`}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      {staffMember.metadata.email}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Biography</h2>
              
              {staffMember.metadata.bio ? (
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: staffMember.metadata.bio }}
                />
              ) : (
                <p className="text-gray-600 text-lg">
                  Biography information is not available for {staffMember.metadata.name}.
                </p>
              )}

              {/* Additional Information */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Get in Touch
                </h3>
                <p className="text-gray-600 mb-4">
                  Interested in learning more about {staffMember.metadata.name}'s work or 
                  the {staffMember.metadata.department?.value} department? We'd love to hear from you.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/visit-us" 
                    className="btn-primary text-center"
                  >
                    Plan Your Visit
                  </Link>
                  <Link 
                    href="/events" 
                    className="btn-secondary text-center"
                  >
                    Upcoming Events
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Staff */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link 
            href="/staff"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Staff
          </Link>
        </div>
      </div>
    </div>
  )
}
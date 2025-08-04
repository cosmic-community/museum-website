import { getStaff } from '@/lib/cosmic'
import { Staff } from '@/types'
import StaffCard from '@/components/StaffCard'

export const metadata = {
  title: 'Staff - Museum',
  description: 'Meet our dedicated team of curators, educators, and administrators who bring art and culture to our community.',
}

export default async function StaffPage() {
  let staff: Staff[] = [];

  try {
    staff = await getStaff() as Staff[];
  } catch (error) {
    console.error('Error fetching staff:', error);
  }

  // Group staff by department
  const administration = staff.filter(member => member.metadata?.department?.key === 'administration');
  const curatorial = staff.filter(member => member.metadata?.department?.key === 'curatorial');
  const education = staff.filter(member => member.metadata?.department?.key === 'education');
  const conservation = staff.filter(member => member.metadata?.department?.key === 'conservation');
  const visitorServices = staff.filter(member => member.metadata?.department?.key === 'visitor_services');

  const renderStaffSection = (title: string, members: Staff[]) => {
    if (members.length === 0) return null;
    
    return (
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <StaffCard key={member.id} staff={member} />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our dedicated team of professionals who bring art, culture, and education together to create meaningful experiences for our visitors
          </p>
        </div>

        {renderStaffSection('Administration', administration)}
        {renderStaffSection('Curatorial', curatorial)}
        {renderStaffSection('Education', education)}
        {renderStaffSection('Conservation', conservation)}
        {renderStaffSection('Visitor Services', visitorServices)}

        {staff.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No staff information available at this time.</p>
          </div>
        )}

        {/* Department Info */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Departments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Administration</h3>
              <p className="text-sm text-gray-600">Leadership and museum operations</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Curatorial</h3>
              <p className="text-sm text-gray-600">Collection management and exhibitions</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Education</h3>
              <p className="text-sm text-gray-600">Programs and community outreach</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
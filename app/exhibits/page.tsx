import { getExhibits } from '@/lib/cosmic'
import { Exhibit } from '@/types'
import ExhibitCard from '@/components/ExhibitCard'

export const metadata = {
  title: 'Exhibitions - Museum',
  description: 'Explore our current, upcoming, and past exhibitions featuring art from around the world.',
}

export default async function ExhibitsPage() {
  let exhibits: Exhibit[] = [];

  try {
    exhibits = await getExhibits() as Exhibit[];
  } catch (error) {
    console.error('Error fetching exhibits:', error);
  }

  // Group exhibits by status
  const currentExhibits = exhibits.filter(exhibit => exhibit.metadata?.status?.key === 'current');
  const upcomingExhibits = exhibits.filter(exhibit => exhibit.metadata?.status?.key === 'upcoming');
  const pastExhibits = exhibits.filter(exhibit => exhibit.metadata?.status?.key === 'past');

  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Exhibitions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our carefully curated exhibitions featuring masterpieces and artifacts from cultures around the world
          </p>
        </div>

        {/* Current Exhibitions */}
        {currentExhibits.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Current Exhibitions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentExhibits.map((exhibit) => (
                <ExhibitCard key={exhibit.id} exhibit={exhibit} />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Exhibitions */}
        {upcomingExhibits.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Exhibitions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingExhibits.map((exhibit) => (
                <ExhibitCard key={exhibit.id} exhibit={exhibit} />
              ))}
            </div>
          </section>
        )}

        {/* Past Exhibitions */}
        {pastExhibits.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Past Exhibitions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastExhibits.map((exhibit) => (
                <ExhibitCard key={exhibit.id} exhibit={exhibit} />
              ))}
            </div>
          </section>
        )}

        {exhibits.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No exhibitions available at this time.</p>
          </div>
        )}
      </div>
    </div>
  )
}
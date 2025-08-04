import Link from 'next/link'
import { getHomepage, getExhibitsByStatus, getEvents } from '@/lib/cosmic'
import { Homepage, Exhibit, Event } from '@/types'
import ExhibitCard from '@/components/ExhibitCard'
import EventCard from '@/components/EventCard'

export default async function HomePage() {
  let homepage: Homepage | null = null
  let currentExhibits: Exhibit[] = []
  let featuredExhibits: Exhibit[] = []
  let upcomingEvents: Event[] = []

  try {
    // Fetch homepage content
    homepage = await getHomepage() as Homepage

    // Fetch current exhibits
    currentExhibits = await getExhibitsByStatus('current') as Exhibit[]
    
    // Use featured exhibits from homepage if available, otherwise use current exhibits
    if (homepage?.metadata.featured_exhibits && homepage.metadata.featured_exhibits.length > 0) {
      featuredExhibits = homepage.metadata.featured_exhibits.slice(0, 3)
    } else {
      featuredExhibits = currentExhibits.slice(0, 3)
    }
    
    // Fetch upcoming events
    const allEvents = await getEvents() as Event[]
    upcomingEvents = allEvents.slice(0, 3)
  } catch (error) {
    console.error('Error fetching homepage data:', error)
  }

  // Fallback content if homepage is not available
  const heroTitle = homepage?.metadata.hero_title || 'Discover Art, Culture & Heritage'
  const heroSubtitle = homepage?.metadata.hero_subtitle || 'Explore 5,000 years of human creativity through world-class exhibitions, educational programs, and cultural experiences that inspire and educate.'
  const heroBackgroundImage = homepage?.metadata.hero_background_image?.imgix_url || 'https://imgix.cosmicjs.com/71729400-7142-11f0-a051-23c10f41277a-photo-1598300042247-d088f8ab3a91-1754319063229.jpg'
  
  const exhibitsTitle = homepage?.metadata.exhibits_title || 'Current Exhibitions'
  const exhibitsSubtitle = homepage?.metadata.exhibits_subtitle || 'Experience our carefully curated exhibitions featuring masterpieces from around the world'
  
  const eventsTitle = homepage?.metadata.events_title || 'Upcoming Events'
  const eventsSubtitle = homepage?.metadata.events_subtitle || 'Join us for lectures, workshops, tours, and special events that bring art to life'
  
  const aboutTitle = homepage?.metadata.about_title || 'About Our Museum'
  const aboutContent = homepage?.metadata.about_content || '<p>Founded in 1952, our museum is dedicated to preserving, interpreting, and sharing the world\'s artistic heritage. We believe that art has the power to inspire, educate, and bring communities together across cultural and generational boundaries.</p><p>Our permanent collection spans over 5,000 years of human creativity, featuring masterpieces from ancient civilizations to contemporary works. With more than 25,000 objects in our collection, we showcase painting, sculpture, decorative arts, and multimedia installations from around the globe.</p>'
  const aboutImage = homepage?.metadata.about_image?.imgix_url || 'https://imgix.cosmicjs.com/8b55d880-a045-11ed-81f2-f50e185dd248-T7K4aEPoGGk.jpg'

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white">
        <div className="absolute inset-0">
          <img 
            src={`${heroBackgroundImage}?w=2000&h=800&fit=crop&auto=format,compress`}
            alt="Museum hero background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative container-custom py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              {heroTitle}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 mb-8">
              {heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/exhibits" className="btn-primary text-center">
                View Current Exhibits
              </Link>
              <Link href="/visit-us" className="btn-secondary text-center">
                Plan Your Visit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured/Current Exhibits */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{exhibitsTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {exhibitsSubtitle}
            </p>
          </div>

          {featuredExhibits.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {featuredExhibits.map((exhibit) => (
                <ExhibitCard key={exhibit.id} exhibit={exhibit} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No current exhibitions available.</p>
            </div>
          )}

          <div className="text-center">
            <Link 
              href="/exhibits" 
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold text-lg"
            >
              View All Exhibitions
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{eventsTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {eventsSubtitle}
            </p>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No upcoming events scheduled.</p>
            </div>
          )}

          <div className="text-center">
            <Link 
              href="/events" 
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold text-lg"
            >
              View All Events
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">{aboutTitle}</h2>
              <div 
                className="text-lg text-gray-700 mb-8 prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: aboutContent }}
              />
              <Link href="/about-the-museum" className="btn-primary">
                Learn More About Us
              </Link>
            </div>
            <div className="relative">
              <img 
                src={`${aboutImage}?w=1200&h=800&fit=crop&auto=format,compress`}
                alt="Museum gallery"
                width="600"
                height="400"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Helper function for error checking
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Fetch homepage content
export async function getHomepage() {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'homepage'
      })
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch homepage content')
  }
}

// Fetch all exhibits
export async function getExhibits() {
  try {
    const response = await cosmic.objects
      .find({ type: 'exhibits' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-created_at')
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch exhibits')
  }
}

// Fetch exhibits by status
export async function getExhibitsByStatus(status: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'exhibits',
        'metadata.status': status
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-created_at')
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error(`Failed to fetch ${status} exhibits`)
  }
}

// Fetch single exhibit by slug
export async function getExhibit(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'exhibits',
        slug
      })
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch exhibit')
  }
}

// Fetch all events
export async function getEvents() {
  try {
    const response = await cosmic.objects
      .find({ type: 'events' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-created_at')
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch events')
  }
}

// Fetch single event by slug
export async function getEvent(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'events',
        slug
      })
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch event')
  }
}

// Fetch all staff
export async function getStaff() {
  try {
    const response = await cosmic.objects
      .find({ type: 'staff' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('title')
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch staff')
  }
}

// Fetch staff by department
export async function getStaffByDepartment(department: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'staff',
        'metadata.department': department
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('title')
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error(`Failed to fetch staff for ${department} department`)
  }
}

// Fetch single staff member by slug
export async function getStaffMember(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'staff',
        slug
      })
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch staff member')
  }
}

// Fetch all pages
export async function getPages() {
  try {
    const response = await cosmic.objects
      .find({ type: 'pages' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('title')
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch pages')
  }
}

// Fetch navigation pages
export async function getNavigationPages() {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'pages',
        'metadata.show_in_nav': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('title')
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch navigation pages')
  }
}

// Fetch single page by slug
export async function getPage(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'pages',
        slug
      })
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch page')
  }
}
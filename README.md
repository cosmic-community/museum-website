# Museum Website

![Museum Website Preview](https://imgix.cosmicjs.com/71729400-7142-11f0-a051-23c10f41277a-photo-1598300042247-d088f8ab3a91-1754319063229.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A sophisticated Next.js website for a museum featuring dynamic exhibits, events, staff profiles, and informational pages. Built with modern web technologies and powered by Cosmic CMS for seamless content management.

## Features

- 🎨 **Dynamic Exhibits Gallery** - Showcase current, upcoming, and past exhibitions with detailed information and image galleries
- 📅 **Events Calendar** - Display lectures, workshops, tours, and special events with registration details
- 👥 **Staff Directory** - Professional team member profiles organized by department
- 📄 **Dynamic Pages** - Flexible content pages with navigation control
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- 🔍 **SEO Optimized** - Search engine friendly with proper meta tags
- ⚡ **Fast Performance** - Built with Next.js 15 and optimized for speed
- 🎯 **Type-Safe** - Full TypeScript implementation with strict typing

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6890c7c79f3266af745d3a94&clone_repository=689133e0dd977d3467eb5528)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a website for a museum with exhibits, events, and more"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless content management
- **React** - Component-based UI library

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the museum content bucket

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd museum-website
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Cosmic credentials to `.env.local`:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Exhibits

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all current exhibits
const currentExhibits = await cosmic.objects
  .find({ 
    type: 'exhibits',
    'metadata.status': 'current' 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get single exhibit by slug
const exhibit = await cosmic.objects
  .findOne({
    type: 'exhibits',
    slug: 'impressionist-masters-light-and-color'
  })
  .depth(1)
```

### Fetching Events

```typescript
// Get upcoming events
const events = await cosmic.objects
  .find({ type: 'events' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
  .sort('-created_at')
```

### Fetching Staff by Department

```typescript
// Get staff by department
const curatorial = await cosmic.objects
  .find({ 
    type: 'staff',
    'metadata.department': 'curatorial'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This website integrates with four main Cosmic object types:

- **Exhibits** (`exhibits`) - Museum exhibitions with status (current/upcoming/past), dates, and galleries
- **Events** (`events`) - Museum events including lectures, workshops, tours, and special events
- **Staff** (`staff`) - Team member profiles with departments, photos, and contact information
- **Pages** (`pages`) - General website pages with navigation control

All content is dynamically loaded from your Cosmic bucket and can be managed through the Cosmic dashboard without requiring code changes.

## Deployment

### Deploy to Vercel

1. Connect your repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Deploy automatically on every push to main branch

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `out` (if using static export)
4. Configure environment variables in Netlify dashboard

### Environment Variables

Set these environment variables in your hosting platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key
- `COSMIC_WRITE_KEY` - Your Cosmic write key (if needed for admin features)

## Project Structure

```
├── app/                  # Next.js 15 App Router
│   ├── exhibits/        # Exhibits section
│   ├── events/          # Events section
│   ├── staff/           # Staff directory
│   └── [pages]/         # Dynamic pages
├── components/          # Reusable components
├── lib/                # Utilities and Cosmic client
├── types.ts            # TypeScript definitions
└── tailwind.config.js  # Tailwind CSS configuration
```

<!-- README_END -->
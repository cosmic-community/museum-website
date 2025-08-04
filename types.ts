// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Exhibit interface
export interface Exhibit extends CosmicObject {
  type: 'exhibits';
  metadata: {
    title: string;
    description: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    start_date: string;
    end_date?: string;
    location?: string;
    status: {
      key: ExhibitStatus;
      value: string;
    };
  };
}

// Event interface
export interface Event extends CosmicObject {
  type: 'events';
  metadata: {
    title: string;
    description: string;
    event_image?: {
      url: string;
      imgix_url: string;
    };
    date_time: string;
    location?: string;
    event_type: {
      key: EventType;
      value: string;
    };
    price?: string;
    registration_required: boolean;
  };
}

// Staff interface
export interface Staff extends CosmicObject {
  type: 'staff';
  metadata: {
    name: string;
    position: string;
    bio?: string;
    photo?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    department: {
      key: Department;
      value: string;
    };
  };
}

// Page interface
export interface Page extends CosmicObject {
  type: 'pages';
  metadata: {
    title: string;
    content: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    show_in_nav: boolean;
  };
}

// Type literals for select-dropdown values
export type ExhibitStatus = 'current' | 'upcoming' | 'past';
export type EventType = 'lecture' | 'workshop' | 'tour' | 'special';
export type Department = 'administration' | 'curatorial' | 'education' | 'conservation' | 'visitor_services';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards for runtime validation
export function isExhibit(obj: CosmicObject): obj is Exhibit {
  return obj.type === 'exhibits';
}

export function isEvent(obj: CosmicObject): obj is Event {
  return obj.type === 'events';
}

export function isStaff(obj: CosmicObject): obj is Staff {
  return obj.type === 'staff';
}

export function isPage(obj: CosmicObject): obj is Page {
  return obj.type === 'pages';
}
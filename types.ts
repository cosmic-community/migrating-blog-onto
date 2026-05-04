export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
  };
}

export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name?: string;
    bio?: string;
    profile_image?: CosmicImage;
    social_links?: {
      twitter?: string;
      facebook?: string;
      linkedin?: string;
      website?: string;
    };
  };
}

export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title?: string;
    excerpt?: string;
    content?: string;
    featured_image?: CosmicImage;
    publish_date?: string;
    reading_time?: number;
    author?: Author;
    category?: Category;
    tags?: string[] | string;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}
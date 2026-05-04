// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor, getMetafieldValue } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const image = author.metadata?.profile_image
  const social = author.metadata?.social_links

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 pb-12 border-b border-gray-200">
        {image ? (
          <img 
            src={`${image.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
            alt={name}
            className="w-32 h-32 rounded-full object-cover mx-auto mb-6"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-6 flex items-center justify-center text-4xl font-bold text-gray-500">
            {name.charAt(0)}
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{name}</h1>
        {bio && <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">{bio}</p>}
        
        {social && (
          <div className="flex justify-center gap-4">
            {social.twitter && (
              <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600">Twitter</a>
            )}
            {social.facebook && (
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600">Facebook</a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600">LinkedIn</a>
            )}
            {social.website && (
              <a href={social.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600">Website</a>
            )}
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-8">Posts by {name}</h2>

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
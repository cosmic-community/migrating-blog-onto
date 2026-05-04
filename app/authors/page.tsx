import { getAllAuthors, getMetafieldValue } from '@/lib/cosmic'
import Link from 'next/link'

export default async function AuthorsPage() {
  const authors = await getAllAuthors()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Authors</h1>
        <p className="text-lg text-gray-600">Meet the writers behind Crimewire</p>
      </div>

      {authors.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600">No authors found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author) => {
            const name = getMetafieldValue(author.metadata?.name) || author.title
            const bio = getMetafieldValue(author.metadata?.bio)
            const image = author.metadata?.profile_image

            return (
              <Link 
                key={author.id} 
                href={`/authors/${author.slug}`}
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow text-center"
              >
                {image ? (
                  <img 
                    src={`${image.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
                    alt={name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-gray-500">
                    {name.charAt(0)}
                  </div>
                )}
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-red-600 mb-2">{name}</h2>
                {bio && <p className="text-sm text-gray-600 line-clamp-3">{bio}</p>}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory, getMetafieldValue } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const categoryName = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 pb-12 border-b border-gray-200">
        <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">Category</span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">{categoryName}</h1>
        {description && (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">No posts in this category yet.</p>
        </div>
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
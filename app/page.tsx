import { getAllPosts, getAllCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories()
  ])

  if (posts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">No posts yet</h1>
        <p className="text-gray-600">Check back soon for new content.</p>
      </div>
    )
  }

  const featuredPost = posts[0]
  const recentPosts = posts.slice(1, 7)
  const olderPosts = posts.slice(7, 13)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Hero Featured Post */}
      {featuredPost && (
        <section className="mb-16">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">Featured</span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">Latest Story</h1>
          </div>
          <PostCard post={featuredPost} featured />
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="mb-12 py-8 border-y border-gray-200">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="px-5 py-2 bg-gray-100 hover:bg-red-600 hover:text-white text-gray-800 text-sm font-medium rounded-full transition-colors"
              >
                {cat.metadata?.name || cat.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts Grid */}
      {recentPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* More Stories */}
      {olderPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">More Stories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {olderPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
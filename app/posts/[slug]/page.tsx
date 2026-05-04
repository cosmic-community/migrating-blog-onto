// app/posts/[slug]/page.tsx
import { getPostBySlug, getAllPosts, getMetafieldValue } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PostCard from '@/components/PostCard'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const allPosts = await getAllPosts()
  const relatedPosts = allPosts.filter(p => p.id !== post.id).slice(0, 3)

  const title = getMetafieldValue(post.metadata?.title) || post.title
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const content = getMetafieldValue(post.metadata?.content)
  const image = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const publishDate = post.metadata?.publish_date || post.created_at
  const readingTime = post.metadata?.reading_time
  const tags = post.metadata?.tags

  const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  })

  const tagsArray: string[] = Array.isArray(tags) 
    ? tags 
    : typeof tags === 'string' && tags ? tags.split(',').map((t: string) => t.trim()) : []

  return (
    <article>
      {/* Hero Image */}
      {image && (
        <div className="w-full aspect-[21/9] max-h-[500px] overflow-hidden bg-gray-100">
          <img 
            src={`${image.imgix_url}?w=2000&h=857&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category */}
        {category && (
          <Link 
            href={`/categories/${category.slug}`}
            className="inline-block text-sm font-semibold text-red-600 uppercase tracking-wider mb-4 hover:underline"
          >
            {getMetafieldValue(category.metadata?.name) || category.title}
          </Link>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {title}
        </h1>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">{excerpt}</p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 pb-8 mb-8 border-b border-gray-200">
          {author && (
            <Link href={`/authors/${author.slug}`} className="flex items-center gap-3 group">
              {author.metadata?.profile_image && (
                <img 
                  src={`${author.metadata.profile_image.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                  alt={getMetafieldValue(author.metadata?.name) || author.title}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <div className="font-semibold text-gray-900 group-hover:text-red-600">
                  {getMetafieldValue(author.metadata?.name) || author.title}
                </div>
                <div className="text-sm text-gray-500">
                  {formattedDate}
                  {readingTime && ` • ${readingTime} min read`}
                </div>
              </div>
            </Link>
          )}
          {!author && (
            <div className="text-sm text-gray-500">
              {formattedDate}
              {readingTime && ` • ${readingTime} min read`}
            </div>
          )}
        </div>

        {/* Content */}
        {content && (
          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-red-600 prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

        {/* Tags */}
        {tagsArray.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tagsArray.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">More Stories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
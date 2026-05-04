import Link from 'next/link'
import type { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const title = getMetafieldValue(post.metadata?.title) || post.title
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const image = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const publishDate = post.metadata?.publish_date || post.created_at
  const readingTime = post.metadata?.reading_time

  const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  })

  if (featured) {
    return (
      <Link href={`/posts/${post.slug}`} className="group block">
        <article className="grid md:grid-cols-2 gap-8 items-center">
          {image && (
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
              <img 
                src={`${image.imgix_url}?w=1200&h=900&fit=crop&auto=format,compress`}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div>
            {category && (
              <span className="inline-block text-xs font-semibold text-red-600 uppercase tracking-wider mb-3">
                {getMetafieldValue(category.metadata?.name) || category.title}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors leading-tight">
              {title}
            </h2>
            {excerpt && (
              <p className="text-gray-600 text-lg mb-4 line-clamp-3">{excerpt}</p>
            )}
            <div className="flex items-center gap-3 text-sm text-gray-500">
              {author && <span>By {getMetafieldValue(author.metadata?.name) || author.title}</span>}
              <span>•</span>
              <time>{formattedDate}</time>
              {readingTime && (
                <>
                  <span>•</span>
                  <span>{readingTime} min read</span>
                </>
              )}
            </div>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="h-full flex flex-col">
        {image && (
          <div className="aspect-[16/10] overflow-hidden rounded-lg bg-gray-100 mb-4">
            <img 
              src={`${image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        {category && (
          <span className="inline-block text-xs font-semibold text-red-600 uppercase tracking-wider mb-2">
            {getMetafieldValue(category.metadata?.name) || category.title}
          </span>
        )}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
          {title}
        </h3>
        {excerpt && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">{excerpt}</p>
        )}
        <div className="flex items-center gap-2 text-xs text-gray-500 mt-auto">
          {author && <span>{getMetafieldValue(author.metadata?.name) || author.title}</span>}
          {author && <span>•</span>}
          <time>{formattedDate}</time>
        </div>
      </article>
    </Link>
  )
}
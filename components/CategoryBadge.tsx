import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function CategoryBadge({ category }: { category: Category }) {
  return (
    <Link 
      href={`/categories/${category.slug}`}
      className="inline-block px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 text-sm font-semibold rounded-full transition-colors"
    >
      {getMetafieldValue(category.metadata?.name) || category.title}
    </Link>
  )
}
import Link from 'next/link'
import { getAllCategories } from '@/lib/cosmic'

export default async function Header() {
  const categories = await getAllCategories()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🔍</span>
            <span className="text-xl font-bold text-gray-900">Crimewire</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
              Home
            </Link>
            {categories.slice(0, 5).map((cat) => (
              <Link 
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
              >
                {cat.metadata?.name || cat.title}
              </Link>
            ))}
            <Link href="/authors" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
              Authors
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
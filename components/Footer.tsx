export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>🔍</span> Crimewire
            </h3>
            <p className="text-sm text-gray-400">
              Your go-to resource for keeping you and your family safe in an ever-evolving digital world.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white">News</a></li>
              <li><a href="/" className="hover:text-white">True Crime</a></li>
              <li><a href="/" className="hover:text-white">Safety</a></li>
              <li><a href="/" className="hover:text-white">Relationships</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">About</h4>
            <p className="text-sm text-gray-400">
              Built with Next.js and Cosmic CMS. Migrated from Ghost.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Crimewire Blog. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
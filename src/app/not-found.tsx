import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            404
          </span>
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Explore the Proof of Problem Protocol or search for what you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
          >
            Go Home
          </Link>
          <Link
            href="/explorer"
            className="px-6 py-3 bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.10] rounded-lg font-semibold text-gray-200 transition-colors"
          >
            Explore Problems
          </Link>
          <Link
            href="/faqs"
            className="px-6 py-3 bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.10] rounded-lg font-semibold text-gray-200 transition-colors"
          >
            View FAQs
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
            Oops
          </span>
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
          Something Went Wrong
        </h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          An unexpected error occurred. Our team has been notified.
          Try refreshing the page or return to the home page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.10] rounded-lg font-semibold text-gray-200 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/support"
            className="px-6 py-3 bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.10] rounded-lg font-semibold text-gray-200 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}

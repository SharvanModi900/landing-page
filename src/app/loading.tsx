export default function Loading() {
  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center">
      <div className="text-center">
        {/* Animated spinner */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-cyan-500 border-r-blue-500 border-b-transparent border-l-transparent animate-spin"></div>
        </div>

        {/* Loading message */}
        <p className="text-white text-lg font-medium mb-2">
          Loading...
        </p>
        <p className="text-gray-500 text-sm">
          Please wait
        </p>
      </div>
    </div>
  );
}

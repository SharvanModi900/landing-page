"use client";

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <div className="pt-16 max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold mb-4">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Your Voice Shapes PoPP
          </span>
        </h1>
        <p className="text-gray-400 mb-8">
          We believe in constant evolution. Share your experience, ideas, or concerns and help us build a stronger Proof-of-Problem Protocol.
        </p>

        <form className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold mb-2">We Value Your Feedback</h2>
          <div>
            <label className="block mb-1 text-sm text-gray-400">Name</label>
            <input type="text" className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-white" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-400">Email</label>
            <input type="email" className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-white" />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-400">Message</label>
            <textarea className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-1 focus:ring-cyan-500 h-28 text-white" />
          </div>
          <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

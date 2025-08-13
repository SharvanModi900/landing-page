import React from 'react';

export default function FeedbackPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Left Side - Creative Design */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-gradient-to-tr from-purple-800 via-pink-700 to-orange-500 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('/patterns/abstract-grid.svg')] bg-cover"></div>
        <h1 className="text-5xl font-extrabold z-10">Your Voice Shapes PoPP</h1>
        <p className="mt-4 max-w-md text-lg text-gray-100 z-10">
          We believe in constant evolution. Share your experience, ideas, or concerns and help us build a stronger Proof-of-Problem Protocol.
        </p>
        <img src="/illustrations/feedback-creative.svg" alt="Feedback Illustration" className="mt-8 w-3/4 z-10 animate-bounce" />
      </div>

      {/* Right Side - Feedback Form */}
      <div className="w-1/2 flex justify-center items-center p-12">
        <form className="bg-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">We Value Your Feedback</h2>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Name</label>
            <input type="text" className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Email</label>
            <input type="email" className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm">Message</label>
            <textarea className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"></textarea>
          </div>
          <button className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors font-semibold">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
}

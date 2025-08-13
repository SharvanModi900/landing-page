export default function PremiumCommunityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-gray-100 px-8 py-20 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col gap-28">

        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-serif font-extrabold tracking-tight mb-6 drop-shadow-lg">
            Welcome to the <span className="text-purple-400">PoPP Community</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Connect with forward-thinkers, innovators, and problem-solvers dedicated to a transparent decentralized future.
          </p>
          <a
            href="#join"
            className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-12 rounded-full font-semibold text-lg shadow-lg hover:shadow-indigo-600 transition-shadow"
          >
            Join Us Now
          </a>
        </section>

        {/* Values & Features */}
        <section className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto">
          {[
            {
              title: "Transparency",
              desc: "Every action is visible and verifiable by anyone.",
              icon: (
                <svg
                  className="w-14 h-14 text-purple-400 mb-6 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-4.553a2 2 0 0 0-2.828-2.828L12 7.172 9.879 5.05a2 2 0 0 0-2.828 2.828L10 10m0 0-7 7" />
                </svg>
              ),
            },
            {
              title: "Collaboration",
              desc: "Work alongside validators, developers, and community members globally.",
              icon: (
                <svg
                  className="w-14 h-14 text-purple-400 mb-6 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 0 1-8 0M12 21v-2m6-2a6 6 0 0 1-12 0M12 11v2m0-6v2" />
                </svg>
              ),
            },
            {
              title: "Innovation",
              desc: "Leveraging AI, IoT, and smart contracts for real-world problem-solving.",
              icon: (
                <svg
                  className="w-14 h-14 text-purple-400 mb-6 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3v3m4.5-3v3M6 14a6 6 0 1 0 12 0 6 6 0 0 0-12 0z" />
                </svg>
              ),
            },
          ].map(({ title, desc, icon }, i) => (
            <div key={i} className="bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 rounded-3xl p-10 text-center shadow-lg shadow-purple-900/60 hover:shadow-purple-700/90 transition-shadow">
              {icon}
              <h3 className="text-2xl font-serif font-semibold mb-3">{title}</h3>
              <p className="text-gray-300">{desc}</p>
            </div>
          ))}
        </section>

        {/* Testimonials */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif font-extrabold mb-12 text-center text-purple-400 drop-shadow-lg">
            What Our Community Says
          </h2>
          <div className="space-y-10">
            {[
              {
                name: "Anita S.",
                quote: "PoPP has transformed how I engage with decentralized projects. The transparency and collaboration are unmatched.",
                avatar: "https://randomuser.me/api/portraits/women/68.jpg",
              },
              {
                name: "Rahul K.",
                quote: "Being part of PoPP's community means contributing to real-world impact using cutting-edge tech.",
                avatar: "https://randomuser.me/api/portraits/men/45.jpg",
              },
            ].map(({ name, quote, avatar }, i) => (
              <div key={i} className="bg-indigo-900 rounded-2xl p-8 flex items-center gap-8 shadow-xl hover:shadow-purple-600 transition-shadow">
                <img
                  src={avatar}
                  alt={name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-purple-500 shadow-md"
                />
                <div>
                  <p className="italic text-gray-300 mb-2">"{quote}"</p>
                  <p className="font-semibold text-purple-400">{name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section
          id="join"
          className="max-w-3xl mx-auto text-center bg-gradient-to-r from-purple-700 to-indigo-700 rounded-3xl p-14 shadow-2xl shadow-purple-900/70"
        >
          <h2 className="text-4xl font-serif font-extrabold mb-6 text-white drop-shadow-md">
            Ready to join the revolution?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Become a part of the PoPP community and help us build the future of decentralized problem-solving.
          </p>
          <form className="flex flex-col sm:flex-row gap-6 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow p-4 rounded-full text-gray-900 font-semibold"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 transition rounded-full py-4 px-10 font-bold text-white shadow-lg"
            >
              Subscribe Now
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

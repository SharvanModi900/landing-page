"use client";
import { Mail, MessageCircle, BookOpen } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white p-8 mt-[74px]">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.05),transparent_60%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Need Help? <span className="text-orange-400">We’re Here for You</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Whether you have questions, need technical assistance, or want to connect with our community,
          our support team is ready to help.
        </p>
      </div>

      {/* Support Options */}
      <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          {
            title: "Email Support",
            desc: "Reach out to our friendly team via email for personalized help.",
            icon: <Mail className="w-10 h-10 text-orange-400" />,
            btn: "Send Email",
          },
          {
            title: "Live Chat",
            desc: "Get quick answers with our live chat feature.",
            icon: <MessageCircle className="w-10 h-10 text-orange-400" />,
            btn: "Start Chat",
          },
          {
            title: "Knowledge Base",
            desc: "Browse guides, FAQs, and documentation for self-help.",
            icon: <BookOpen className="w-10 h-10 text-orange-400" />,
            btn: "Explore Docs",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform border border-white/10"
          >
            <div className="flex justify-center">{card.icon}</div>
            <h3 className="mt-4 text-xl font-bold">{card.title}</h3>
            <p className="text-gray-400 mt-2">{card.desc}</p>
            <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-xl shadow-lg transition-all">
              {card.btn}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

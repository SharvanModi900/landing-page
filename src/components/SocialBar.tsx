"use client";
import { useState, useEffect } from "react";
import { Mail, Twitter, Linkedin, Github, Instagram } from "lucide-react";

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

const socials = [
  { icon: Twitter, href: "https://x.com/ShravanModi8", label: "X (Twitter)", color: "hover:bg-sky-500/20 hover:border-sky-500/40" },
  { icon: DiscordIcon, href: "https://discord.gg/u6GqfJBsm", label: "Discord", color: "hover:bg-indigo-500/20 hover:border-indigo-500/40" },
  { icon: Github, href: "https://github.com/SharvanModi900/proof-of-problem-protocol", label: "GitHub", color: "hover:bg-white/20 hover:border-white/30" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "hover:bg-pink-500/20 hover:border-pink-500/40" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-500/20 hover:border-blue-500/40" },
  { icon: Mail, href: "mailto:contact@popp.thharko.com", label: "Email", color: "hover:bg-amber-500/20 hover:border-amber-500/40" },
];

export default function SocialBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    setVisible(window.scrollY > 200);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed left-0 top-1/2 -translate-y-1/2 z-[999] flex flex-col gap-2 transition-all duration-300 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
      }`}
    >
      {socials.map(({ icon: Icon, href, label, color }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
          title={label}
          aria-label={label}
          className={`group relative flex items-center justify-center w-10 h-10 rounded-r-xl bg-[#0d1526]/90 backdrop-blur-sm border border-white/[0.08] ${color} transition-all duration-200`}
        >
          <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          {/* Tooltip */}
          <span className="absolute left-full ml-2 px-2 py-1 text-[10px] font-medium text-white bg-black/80 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}

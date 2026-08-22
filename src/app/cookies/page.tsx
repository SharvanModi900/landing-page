"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getCookiePrefs, saveCookiePrefs, type CookiePreferences } from "@/components/CookieConsent";

/* ------------------------------------------------------------------ */
/*  Cookie category definitions                                       */
/* ------------------------------------------------------------------ */
const categories: {
  key: keyof CookiePreferences;
  title: string;
  required: boolean;
  description: string;
  cookies: { name: string; purpose: string; expiry: string }[];
}[] = [
  {
    key: "essential",
    title: "Essential Cookies",
    required: true,
    description:
      "Required for the website to function. These enable core features like security, session management, and accessibility. They cannot be disabled.",
    cookies: [
      { name: "popp-cookie-consent", purpose: "Stores your cookie consent preference", expiry: "1 year" },
      { name: "popp-session", purpose: "Maintains user session state", expiry: "Session" },
    ],
  },
  {
    key: "analytics",
    title: "Analytics Cookies",
    required: false,
    description:
      "Help us understand how visitors interact with the site by collecting anonymous usage data. This helps us improve performance and user experience.",
    cookies: [
      { name: "_ga", purpose: "Google Analytics — unique client identifier", expiry: "2 years" },
      { name: "_ga_*", purpose: "Google Analytics — session state", expiry: "2 years" },
    ],
  },
  {
    key: "marketing",
    title: "Marketing Cookies",
    required: false,
    description:
      "Used to deliver relevant advertisements and track campaign effectiveness. They may be set by our advertising partners through our site.",
    cookies: [
      { name: "_fbp", purpose: "Facebook Pixel — deliver advertisement", expiry: "3 months" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
export default function CookiesPage() {
  const [prefs, setPrefs] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = getCookiePrefs();
    if (stored) setPrefs(stored);
  }, []);

  const toggle = (key: keyof CookiePreferences) => {
    if (key === "essential") return; // cannot disable
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const handleSave = () => {
    saveCookiePrefs(prefs);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const acceptAll = () => {
    const all: CookiePreferences = { essential: true, analytics: true, marketing: true };
    setPrefs(all);
    saveCookiePrefs(all);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0d1526] to-[#0a0f1a] text-white pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="text-xs text-gray-400 hover:text-cyan-400 transition-colors mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2">Cookie Policy</h1>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed max-w-xl">
            We use cookies to make this website work and to improve your experience.
            Manage your preferences below. Essential cookies cannot be disabled as they
            are required for the site to function.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Last updated: August 22, 2026
          </p>
        </div>

        {/* Category cards */}
        <div className="space-y-4">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h2 className="text-base font-semibold text-white flex items-center gap-2">
                    {cat.title}
                    {cat.required && (
                      <span className="text-[9px] font-semibold text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                        Required
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{cat.description}</p>
                </div>

                {/* Toggle */}
                <button
                  onClick={() => toggle(cat.key)}
                  disabled={cat.required}
                  aria-label={`Toggle ${cat.title}`}
                  className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors ${
                    prefs[cat.key]
                      ? "bg-cyan-500"
                      : "bg-white/[0.08]"
                  } ${cat.required ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:opacity-90"}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      prefs[cat.key] ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Cookie table */}
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] text-gray-400">
                  <thead>
                    <tr className="border-b border-white/[0.04]">
                      <th className="text-left py-1.5 font-medium text-gray-500">Cookie</th>
                      <th className="text-left py-1.5 font-medium text-gray-500">Purpose</th>
                      <th className="text-right py-1.5 font-medium text-gray-500">Expiry</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.cookies.map((c) => (
                      <tr key={c.name} className="border-b border-white/[0.02]">
                        <td className="py-1.5 font-mono text-gray-300">{c.name}</td>
                        <td className="py-1.5">{c.purpose}</td>
                        <td className="py-1.5 text-right">{c.expiry}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all"
          >
            Save Preferences
          </button>
          <button
            onClick={acceptAll}
            className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-gray-400 hover:text-white border border-white/[0.08] rounded-xl hover:bg-white/[0.04] transition-colors"
          >
            Accept All Cookies
          </button>
          {saved && (
            <span className="text-xs text-emerald-400 animate-pulse">
              ✓ Preferences saved
            </span>
          )}
        </div>

        {/* More info */}
        <div className="mt-10 pt-6 border-t border-white/[0.04]">
          <h3 className="text-sm font-semibold text-white mb-2">About Cookies</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Cookies are small text files stored on your device when you visit a website. They are
            widely used to make sites work efficiently and to provide information to site owners.
            You can control cookies through your browser settings, but disabling essential cookies
            may prevent parts of the site from functioning.
          </p>
          <p className="text-xs text-gray-400 leading-relaxed mt-3">
            For more information about how we handle your data, see our{" "}
            <Link href="/privacy-policy" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/data-compliance" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
              Data Compliance
            </Link>{" "}
            pages.
          </p>
        </div>
      </div>
    </section>
  );
}

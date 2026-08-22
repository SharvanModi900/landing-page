"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Cookie consent helpers                                            */
/* ------------------------------------------------------------------ */
const CONSENT_KEY = "popp-cookie-consent";

export interface CookiePreferences {
  essential: boolean;   // always true — cannot be disabled
  analytics: boolean;
  marketing: boolean;
}

const DEFAULT_PREFS: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

export function getCookiePrefs(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookiePreferences;
  } catch {
    return null;
  }
}

export function saveCookiePrefs(prefs: CookiePreferences) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs));
}

/* ------------------------------------------------------------------ */
/*  Banner component                                                  */
/* ------------------------------------------------------------------ */
export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const prefs = getCookiePrefs();
    if (!prefs) setShow(true); // no consent yet → show banner
  }, []);

  const acceptAll = () => {
    saveCookiePrefs({ essential: true, analytics: true, marketing: true });
    setShow(false);
  };

  const acceptEssential = () => {
    saveCookiePrefs(DEFAULT_PREFS);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
    >
      <div className="max-w-4xl mx-auto bg-[#0d1526]/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/40 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Text */}
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-white mb-1">Cookie Settings</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              We use essential cookies for the site to function. With your consent, we also use
              analytics and marketing cookies to improve your experience.{" "}
              <Link href="/cookies" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
                Cookie&nbsp;Policy
              </Link>
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={acceptEssential}
              className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white border border-white/[0.08] rounded-lg hover:bg-white/[0.04] transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

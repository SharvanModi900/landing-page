/**
 * GA4 conversion event tracker
 * Only fires if GA4 has been loaded (after cookie consent)
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gtag = (window as any).gtag;
  if (typeof gtag === "function") {
    gtag("event", eventName, params);
  }
}

/* Pre-defined conversion events */
export const conversions = {
  walletCreated: () => trackEvent("wallet_created", { method: "create" }),
  walletImported: () => trackEvent("wallet_imported", { method: "import" }),
  walletConnected: () => trackEvent("wallet_connected", { method: "connect" }),
  reportSubmitted: (category: string) =>
    trackEvent("report_submitted", { category }),
  newsletterSignup: (location: string) =>
    trackEvent("newsletter_signup", { page_location: location }),
  ctaClick: (ctaName: string, page: string) =>
    trackEvent("cta_click", { cta_name: ctaName, page_path: page }),
  socialClick: (platform: string) =>
    trackEvent("social_click", { platform }),
  externalLink: (url: string) =>
    trackEvent("external_link", { link_url: url }),
};

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Problem Explorer",
  description:
    "Browse verified problems on the PoPP Explorer — view real-world civic issues with cryptographic evidence, validation status, geolocation data, and community verification details.",
  keywords: [
    "PoPP explorer",
    "problem explorer",
    "verified problems",
    "civic issue tracker",
    "blockchain problem viewer",
    "geotagged evidence",
  ],
  alternates: { canonical: "/explorer" },
  openGraph: {
    title: "Problem Explorer — PoPP",
    description:
      "Browse verified civic problems with cryptographic evidence, validation status, and geolocation data.",
    url: "/explorer",
  },
  twitter: {
    title: "Problem Explorer — PoPP",
    description: "Browse verified civic problems with cryptographic evidence and validation status.",
  },
};

export default function ExplorerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

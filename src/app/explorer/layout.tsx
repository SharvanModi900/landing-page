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

const explorerJsonLd = {"@context":"https://schema.org","@type":"WebApplication","name":"Block Explorer - PoPP","url":"https://pops.thharko.com/explorer","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"},"applicationCategory":"BlockchainApplication","operatingSystem":"Web"};

export default function ExplorerLayout({ children }: { children: React.ReactNode }) {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(explorerJsonLd) }} />{children}</>;
}

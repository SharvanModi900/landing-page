import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Research Papers",
  description:
    "Explore PoPP research papers, technical documentation, and protocol specifications. Access whitepapers, architecture blueprints, and academic resources on decentralized problem validation.",
  keywords: [
    "PoPP research papers",
    "protocol documentation",
    "decentralized validation research",
    "PoPP technical specs",
    "blockchain research",
    "civic tech papers",
  ],
  alternates: { canonical: "/whitepapers" },
  openGraph: {
    title: "Research Papers — PoPP",
    description:
      "Explore PoPP research papers, technical documentation, and protocol specifications on decentralized problem validation.",
    url: "/whitepapers",
  },
  twitter: {
    title: "Research Papers — PoPP",
    description:
      "Explore PoPP research papers and technical documentation on decentralized problem validation.",
  },
};

const whitepapersJsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"whitepapers","url":"https://pops.thharko.com/whitepapers","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function WhitepapersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Research Papers" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(whitepapersJsonLd) }} />{children}</>;
}

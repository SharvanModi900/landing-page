import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Resolutions",
  description:
    "View problem resolutions on PoPP — track how reported civic issues are resolved through community validation, dispute mechanisms, and decentralized governance decisions.",
  keywords: [
    "problem resolutions",
    "dispute resolution",
    "resolved civic issues",
    "PoPP dispute mechanism",
    "governance resolutions",
  ],
  alternates: { canonical: "/resolutions" },
  openGraph: {
    title: "Resolutions — PoPP",
    description:
      "Track how civic issues are resolved through community validation and decentralized governance.",
    url: "/resolutions",
  },
  twitter: {
    title: "Resolutions — PoPP",
    description: "Track how civic issues are resolved through community validation and governance.",
  },
};

const resolutionsJsonLd = {"@context":"https://schema.org","@type":"ItemList","name":"Resolutions - PoPP","url":"https://pops.thharko.com/resolutions","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function ResolutionsLayout({ children }: { children: React.ReactNode }) {
  return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resolutions" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(resolutionsJsonLd) }} />{children}</>;
}

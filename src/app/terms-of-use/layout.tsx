import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "PoPP Terms of Use — rules and guidelines for using the Proof of Problem Protocol, including user responsibilities, intellectual property, and dispute resolution.",
  keywords: ["PoPP terms of use", "terms of service", "user agreement", "protocol terms"],
  alternates: { canonical: "/terms-of-use" },
  robots: { index: false, follow: true },
};

const termsofuseJsonLd = {"@context":"https://schema.org","@type":"CreativeWork","name":"Terms of Use - PoPP","url":"https://pops.thharko.com/terms-of-use","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function TermsOfUseLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(termsofuseJsonLd) }} />{children}</>; }

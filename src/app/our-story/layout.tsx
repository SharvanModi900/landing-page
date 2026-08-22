import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Our Story",
  description: "The story behind PoPP — from a broken internet connection to a global decentralized protocol for truth validation and civic problem solving.",
  keywords: ["PoPP story", "origin story", "proof of problem history", "protocol founding"],
  alternates: { canonical: "/our-story" },
};

const ourstoryJsonLd = {"@context":"https://schema.org","@type":"AboutPage","name":"Our Story - PoPP Protocol","url":"https://pops.thharko.com/our-story","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function OurStoryLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our Story" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ourstoryJsonLd) }} />{children}</>; }

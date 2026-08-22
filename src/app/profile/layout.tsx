import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Profile",
  description: "PoPP Profile — view your reputation score, contribution history, validator status, and community achievements on the Proof of Problem Protocol.",
  keywords: ["PoPP profile", "reputation score", "contribution history", "user profile"],
  alternates: { canonical: "/profile" },
};

const profileJsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Profile - PoPP","url":"https://pops.thharko.com/profile","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function ProfileLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Profile" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }} />{children}</>; }

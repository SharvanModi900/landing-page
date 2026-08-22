import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "PoPP Workshops",
  "provider": { "@type": "Organization", "name": "Proof of Problem Protocol" },
  "description": "Hands-on training sessions for validators, reporters, and developers covering problem reporting, evidence validation, and protocol participation."
};

export const metadata: Metadata = {
  title: "Workshops",
  description: "PoPP workshops — hands-on training sessions for validators, reporters, and developers. Learn problem reporting, evidence validation, and protocol participation in guided environments.",
  keywords: ["PoPP workshops", "training events", "validator training", "developer workshops", "hands-on learning"],
  alternates: { canonical: "/workshops" },
  openGraph: { title: "Workshops — PoPP", description: "Hands-on training sessions for validators, reporters, and developers.", url: "/workshops" },
  twitter: { title: "Workshops — PoPP", description: "Hands-on training for validators, reporters, and developers." },
};

export default function WorkshopsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Workshops" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />{children}</>; }

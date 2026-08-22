import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Blog",
  description: "PoPP blog — latest updates on protocol development, community milestones, governance decisions, ecosystem partnerships, and insights from the decentralized civic tech space.",
  keywords: ["PoPP blog", "protocol updates", "community news", "governance updates", "civic tech insights"],
  alternates: { canonical: "/blogs" },
  openGraph: { title: "Blog — PoPP", description: "Latest PoPP updates, community milestones, and decentralized civic tech insights.", url: "/blogs" },
  twitter: { title: "Blog — PoPP", description: "Latest PoPP updates and community milestones." },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "PoPP Blog",
  "description": "Latest updates on protocol development, community milestones, governance decisions, and ecosystem partnerships.",
  "publisher": { "@type": "Organization", "name": "Proof of Problem Protocol", "logo": { "@type": "ImageObject", "url": "https://pops.thharko.com/logo.png" } },
  "inLanguage": "en-US"
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />{children}</>; }

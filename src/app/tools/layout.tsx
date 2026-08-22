import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Tools",
  description: "PoPP Tools — developer utilities, diagnostic tools, and community-built applications for the Proof of Problem Protocol ecosystem.",
  keywords: ["PoPP tools", "developer utilities", "diagnostic tools", "community tools"],
  alternates: { canonical: "/tools" },
};

const toolsJsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Tools - PoPP","url":"https://pops.thharko.com/tools","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function ToolsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsJsonLd) }} />{children}</>; }

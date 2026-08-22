import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Developer Documentation",
  description:
    "PoPP developer documentation — get started building with the Proof of Problem Protocol. API guides, SDK references, integration tutorials, and code examples for decentralized problem validation.",
  keywords: [
    "PoPP developer documentation",
    "API docs",
    "developer guides",
    "PoPP integration",
    "blockchain developer tools",
    "protocol API tutorial",
  ],
  alternates: { canonical: "/developer-docs" },
  openGraph: {
    title: "Developer Documentation — PoPP",
    description: "Get started building with PoPP — API guides, SDK references, and integration tutorials.",
    url: "/developer-docs",
  },
  twitter: { title: "Developer Documentation — PoPP", description: "Get started building with PoPP — API guides, SDK references, and tutorials." },
};

const developerdocsJsonLd = {"@context":"https://schema.org","@type":"TechArticle","name":"Developer Documentation - PoPP","url":"https://pops.thharko.com/developer-docs","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function DeveloperDocsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Developer Documentation" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(developerdocsJsonLd) }} />{children}</>; }

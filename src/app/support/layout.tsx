import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Support",
  description: "PoPP Support — get help, find answers, and connect with the community. We're here to assist you with problem reporting, validation, and protocol usage.",
  keywords: ["PoPP support", "help center", "get help", "support team"],
  alternates: { canonical: "/support" },
};

const supportJsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Support - PoPP","url":"https://pops.thharko.com/support","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function SupportLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Support" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(supportJsonLd) }} />{children}</>; }

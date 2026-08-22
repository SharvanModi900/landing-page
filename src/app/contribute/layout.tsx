import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contribute",
  description: "Contribute to PoPP — open source contributions welcome. Help build the protocol, improve documentation, report bugs, and shape the future of decentralized civic tech.",
  keywords: ["contribute to PoPP", "open source contribution", "PoPP contributors", "bug reporting", "code contribution"],
  alternates: { canonical: "/contribute" },
};

const contributeJsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Contribute to PoPP","url":"https://pops.thharko.com/contribute","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function ContributeLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contribute" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contributeJsonLd) }} />{children}</>; }

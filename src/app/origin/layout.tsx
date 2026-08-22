import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Origin",
  description: "The origin of PoPP — explore the founding story, team, and mission behind the Proof of Problem Protocol.",
  keywords: ["PoPP origin", "protocol origin", "founding story"],
  alternates: { canonical: "/origin" },
};

const originJsonLd = {"@context":"https://schema.org","@type":"AboutPage","name":"Origin of PoPP","url":"https://pops.thharko.com/origin","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function OriginLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Origin" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(originJsonLd) }} />{children}</>; }

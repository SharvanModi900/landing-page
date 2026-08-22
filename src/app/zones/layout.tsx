import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Zones",
  description: "PoPP Zones — explore geographic problem zones, view regional civic issue density, and discover areas where community validation is most needed.",
  keywords: ["PoPP zones", "geographic zones", "civic issue zones", "regional problem density"],
  alternates: { canonical: "/zones" },
};

const zonesJsonLd = {"@context":"https://schema.org","@type":"WebApplication","name":"Zones - PoPP","url":"https://pops.thharko.com/zones","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"},"applicationCategory":"BlockchainApplication","operatingSystem":"Web"};

export default function ZonesLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Zones" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(zonesJsonLd) }} />{children}</>; }

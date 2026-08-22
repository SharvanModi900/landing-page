import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Sensors",
  description: "PoPP IoT Sensors — integrate IoT sensor data for automated problem detection, environmental monitoring, and evidence augmentation in the PoPP ecosystem.",
  keywords: ["PoPP sensors", "IoT sensors", "environmental monitoring", "automated detection", "sensor integration"],
  alternates: { canonical: "/sensors" },
};

const sensorsJsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"sensors","url":"https://pops.thharko.com/sensors","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function SensorsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Sensors" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sensorsJsonLd) }} />{children}</>; }

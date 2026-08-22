import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Using PoPP",
  description: "Getting started with PoPP — a practical guide to reporting problems, becoming a validator, participating in governance, and earning rewards on the protocol.",
  keywords: ["using PoPP", "getting started", "how to use PoPP", "protocol guide", "user guide"],
  alternates: { canonical: "/using-popp" },
  openGraph: { title: "Using PoPP — Getting Started", description: "A practical guide to reporting, validating, and earning on PoPP.", url: "/using-popp" },
  twitter: { title: "Using PoPP — Getting Started", description: "A practical guide to reporting, validating, and earning on PoPP." },
};

const usingpoppJsonLd = {"@context":"https://schema.org","@type":"Article","name":"Using PoPP - Getting Started","url":"https://pops.thharko.com/using-popp","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function UsingPoppLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Using PoPP" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(usingpoppJsonLd) }} />{children}</>; }

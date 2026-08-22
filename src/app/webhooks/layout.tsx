import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Webhooks",
  description: "PoPP webhooks — subscribe to real-time event notifications for problem submissions, validations, governance votes, and reward distributions via configurable webhook endpoints.",
  keywords: ["PoPP webhooks", "event notifications", "real-time events", "webhook integration", "protocol events"],
  alternates: { canonical: "/webhooks" },
  openGraph: { title: "Webhooks — PoPP", description: "Subscribe to real-time PoPP protocol events via configurable webhooks.", url: "/webhooks" },
  twitter: { title: "Webhooks — PoPP", description: "Subscribe to real-time PoPP protocol events via webhooks." },
};

const webhooksJsonLd = {"@context":"https://schema.org","@type":"TechArticle","name":"Webhooks - PoPP Developer Portal","url":"https://pops.thharko.com/webhooks","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function WebhooksLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Webhooks" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webhooksJsonLd) }} />{children}</>; }

import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Notifications",
  description: "PoPP Notifications — stay updated on problem validations, governance votes, reward distributions, and community activity.",
  keywords: ["PoPP notifications", "activity alerts", "validation updates"],
  alternates: { canonical: "/notifications" },
};

const notificationsJsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Notifications - PoPP","url":"https://pops.thharko.com/notifications","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function NotificationsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Notifications" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(notificationsJsonLd) }} />{children}</>; }

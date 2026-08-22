import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Notifications",
  description: "PoPP Notifications — stay updated on problem validations, governance votes, reward distributions, and community activity.",
  keywords: ["PoPP notifications", "activity alerts", "validation updates"],
  alternates: { canonical: "/notifications" },
};

export default function NotificationsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Notifications" }]} />{children}</>; }
